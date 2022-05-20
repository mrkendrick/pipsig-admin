import { Dispatch } from "redux";
import { v4 } from "uuid";
import WalletApiService from "../../utils/api/wallet.api";
import { AlertVariant } from "../reducers/alert.reducer";
import { Action, ActionTypes } from "./types";

const _getWallets =
  (
    { page, limit }: { page: number; limit: number },
    setLoading?: (x: boolean) => void,
  ) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await WalletApiService.getWallets({
        page,
        limit,
      });

      dispatch({
        type: ActionTypes.getWallets,
        payload: res.data,
      });

      setLoading && setLoading(false);
    } catch (error: any) {
      setLoading && setLoading(false);

      if (error?.message === "Network Error") {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.warn,
            text: "You are offline",
          },
        });
      } else if (error?.response?.data?.message) {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: error.response.data.message,
          },
        });
      } else {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: "Something went wrong.",
          },
        });
      }
    }
  };

const _getWallet =
  (id: string, setLoading?: (x: boolean) => void) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await WalletApiService.getWallet(id);

      dispatch({
        type: ActionTypes.getWallet,
        payload: res.data,
      });

      setLoading && setLoading(false);
    } catch (error: any) {
      setLoading && setLoading(false);

      if (error?.message === "Network Error") {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.warn,
            text: "You are offline",
          },
        });
      } else if (error?.response?.data?.message) {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: error.response.data.message,
          },
        });
      } else {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: "Something went wrong.",
          },
        });
      }
    }
  };

const _updateWallet =
  (id: string, data: any, setLoading?: (x: boolean) => void) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const res = await WalletApiService.updateWallet(data, id);

      dispatch({
        type: ActionTypes.updateWallet,
        payload: res.data,
      });

      dispatch({
        type: ActionTypes.alert,
        payload: {
          id: v4().toString(),
          variant: AlertVariant.success,
          text: "Wallet Updated",
        },
      });

      setLoading && setLoading(false);
    } catch (error: any) {
      setLoading && setLoading(false);

      if (error?.message === "Network Error") {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.warn,
            text: "You are offline",
          },
        });
      } else if (error?.response?.data?.message) {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: error.response.data.message,
          },
        });
      } else {
        dispatch({
          type: ActionTypes.alert,
          payload: {
            id: v4().toString(),
            variant: AlertVariant.error,
            text: "Something went wrong.",
          },
        });
      }
    }
  };

const walletActions = { _getWallets, _getWallet, _updateWallet };

export default walletActions;
