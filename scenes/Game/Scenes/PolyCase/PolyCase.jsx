import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCaseById } from "~/api/cases";
import {
  createPolyCaseGame,
  revealPolyCaseGame,
  createPolyCasePaidGame,
  revealPolyCasePaidGame,
  getCurrentPolyCaseGames,
} from "~/api/polyCase";
import { sellSkin } from "~/api/skins";

import { getUserBalance } from "~/actions/user";
import { getFreeCasesIds } from "~/actions/cases";
import { sendErrorNotification, sendSuccessNotification } from "~/actions/notifications";

import Loader from "~/components/Loaders/Loader";
import ContentWrapper from "~/components/ContentWrapper/ContentWrapper";

import GridGame from "../GridGame/GridGame";

import InfoBlock from "../../Components/InfoBlock";
import ExistGame from "../../Components/ExistGame/ExistGame";
import GameHeader from "../../Components/GameHeader/GameHeader";
import CaseContent from "../../Components/CaseContent/CaseContent";

import styles from "./styles.scss";

const freeCaseRejectedMessage = "You must own CSGO or PUBG game on Steam account to open free case";

class PolyCase extends React.Component {
  static propTypes = {
    userId: PropTypes.string,
    getUserBalance: PropTypes.func.isRequired,
    getFreeCasesIds: PropTypes.func.isRequired,
    sendErrorNotification: PropTypes.func.isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    freeCases: PropTypes.objectOf(PropTypes.any).isRequired,
    steamGamesOwned: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    userId: "",
  };

  constructor() {
    super();

    this.baseState = this.state;
  }

  state = {
    Case: {},
    currentGame: {},
    isRevealed: false,
    isBonusGame: false,
    isDisplayedGrid: false,
    revealedBlockIndex: null,
    isWonLayoutDisplaying: true,
  };

  async componentWillMount() {
    const { freeCases } = this.props;
    const currentGame = await this.getCurrentGame();

    if (currentGame) {
      this.setState({ currentGame });
    }

    const { id } = this.props.match.params;
    const freeCasesFiltered = freeCases.availableKeys.filter((caseId) => id === caseId);

    const { data: Case } = await getCaseById(id);

    this.setState({ Case, isBonusGame: !!freeCasesFiltered.length });

    this.baseState.Case = Case;
  }

  onCloseWonLayout = () => this.setState({ isWonLayoutDisplaying: false });

  onStart = async (mode) => {
    try {
      const isDemo = (mode === "DEMO");

      const { userId } = this.props;
      const { id: caseId } = this.props.match.params;

      if (!userId) {
        return this.props.sendErrorNotification({
          message: "You need to be logged in to play this game.",
        });
      }

      await this.manageOngoingGames();

      const currentGame = await this.createGame({ userId, caseId, isDemo });

      if (!isDemo) this.props.getUserBalance(userId);

      return currentGame && this.setState({ currentGame, isRevealed: false});
    } catch ({ response, customError, ...others }) {
      if (customError) {
        return this.props.sendErrorNotification({ message: customError });
      }

      const isBadRequestError = response.status === 400;
      let errorMessage = response.data.error;

      if (isBadRequestError) {
        errorMessage = errorMessage === "User must make a deposit of $5 or more."
          ? "You have not met our withdraw requirement. Please deposit $5 or more to unlock withdraw feature."
          : "You don't have enough funds to play this game."
      }

      if (response.status !== 409) {
        this.props.sendErrorNotification({ message: errorMessage });
      }

      return response;
    }
  };

  onReveal = async (revealedBlockIndex, isPaid) => {
    const { currentGame: Game, isBonusGame } = this.state;

    if (Object.keys(Game).length) {
      const { userId } = this.props;
      const { id: gameId } = this.state.currentGame;

      if (isBonusGame) {
        this.props.getFreeCasesIds(userId);
      }

      const { data: currentGame } = isPaid
        ? (
            await revealPolyCasePaidGame({
              userId,
              gameId,
              blockIndex: revealedBlockIndex,
            })
          )
        : (
          await revealPolyCaseGame({
            userId,
            gameId,
            blockIndex: revealedBlockIndex,
          })
        );

      this.setState({
        currentGame,
        revealedBlockIndex,
        isRevealed: true,
        isWonLayoutDisplaying: true,
      });

      setTimeout(() => {
        this.setState({ isDisplayedGrid: true })
      }, 1000)
    }
  };

  onPlayAgain = async () => this.setState(this.baseState);

  onSell = async () => {
    const {
      userId,
      sendErrorNotification: onError,
      sendSuccessNotification: onSuccess,
    } = this.props;

    const { id: gameId } = this.state.currentGame;

    try {
      await sellSkin({ userId, gameId });

      this.props.getUserBalance(userId);
      this.onCloseWonLayout();

      return onSuccess({
        message: "Your new funds are now available to use in your HexTech Wallet"
      });
    } catch ({ response }) {
      return onError({ message: response.data.error })
    }
  };

  getCurrentGame = async () => {
    const { userId } = this.props;

    if (userId) {
      const { id: caseId } = this.props.match.params;
      const { data: currentGames } = await getCurrentPolyCaseGames({ userId, caseId });

      return currentGames[0];
    }

    return null;
  };

  createGame = async ({ userId, caseId, isDemo }) => {
    const { steamGamesOwned, } = this.props;
    const { Case, isBonusGame } = this.state;

    const purchasePriceUSD = isBonusGame
      ? 0
      : Case.price;

    if (isBonusGame && !steamGamesOwned.length) {
      const rejectedMessage = { customError: freeCaseRejectedMessage };

      throw rejectedMessage;
    }

    const { data: currentGame } = isDemo
      ? await createPolyCaseGame({ userId, caseId })
      : await createPolyCasePaidGame({ userId, caseId, purchasePriceUSD });

    return currentGame;
  };

  manageOngoingGames = async () => {
    const { userId } = this.props;
    const gamesData = await getCurrentPolyCaseGames({ userId });

    if (gamesData) {
      const { data: games } = gamesData;
      const game = games[0];

      if (game) {
        if (game.mode !== "DEMO") {
          this.props.sendErrorNotification({
            message: <ExistGame existGame={game} />,
            autoDismiss: 10,
          });
        } else {
          await revealPolyCaseGame({
            userId,
            gameId: game.id,
            blockIndex: 0,
          });
        }
      }
    }

    return gamesData;
  };

  render() {
    const {
      Case,
      isRevealed,
      currentGame,
      isBonusGame,
      isDisplayedGrid,
      revealedBlockIndex,
      isWonLayoutDisplaying,
    } = this.state;

    const skins = Case.Skins;


    return (
      <div className={styles.mainView}>
        <Loader
          loaded={!!Case.length}
          style={{ minHeight: "calc(80vh - 58px)" }}
        >
          {
            Case.length &&
            <React.Fragment>
              <GameHeader
                {...Case}
                isBonusGame={isBonusGame}
                currentGame={currentGame}
                onPlayAgain={this.onPlayAgain}
              />
              <CaseContent
                skins={skins}
                length={Case.length}
              />
              <React.Fragment>
                {
                  isBonusGame &&
                  <InfoBlock />
                }
              </React.Fragment>
              <ContentWrapper>
                <div className={styles.contentView}>
                  <GridGame
                    Case={Case}
                    skins={skins}
                    onSell={this.onSell}
                    onStart={this.onStart}
                    onReveal={this.onReveal}
                    currentGame={currentGame}
                    isBonusGame={isBonusGame}
                    revealedBlockIndex={revealedBlockIndex}
                    onCloseWonLayout={this.onCloseWonLayout}
                    isRevealed={isRevealed && isDisplayedGrid}
                    isWonLayoutDisplaying={isWonLayoutDisplaying}
                  />
                </div>
              </ContentWrapper>
            </React.Fragment>
          }
        </Loader>
      </div>
    );
  }
}

const mapStateToProps =
  ({
    bonuses: { freeCases },
    user: {
      id: userId,
      steamGamesOwned,
    },
  }) => ({
    userId,
    freeCases,
    steamGamesOwned,
  });
const mapDispatchToProps = ({
  getUserBalance,
  getFreeCasesIds,
  sendErrorNotification,
  sendSuccessNotification,
});

export default connect(mapStateToProps, mapDispatchToProps)(PolyCase);
