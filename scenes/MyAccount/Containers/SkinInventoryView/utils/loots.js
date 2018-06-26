const ERROR = "ERROR";
const SEARCH = "SEARCH";
const TRADE_TO_PUBLIC = "TRADE_TO_PUBLIC";
const TRADE_TO_USER = "TRADE_TO_USER";
const ACCEPT_USER_TRADE = "ACCEPT_USER_TRADE";
const DECLINED = "DECLINED";
const DELIVERED = "DELIVERED";

export const lootStatuses = {
  ERROR,
  SEARCH,
  TRADE_TO_PUBLIC,
  TRADE_TO_USER,
  ACCEPT_USER_TRADE,
  DECLINED,
  DELIVERED,
};

export const levelColors = {
  info: "#44CF84",
  warning: "#EBD13C",
  error: "#CF4444",
};

export const getColorByLootLevel = (level) => levelColors[level && level.toLowerCase()] || levelColors.warning;
