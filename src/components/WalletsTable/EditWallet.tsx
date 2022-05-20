import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  FormControl,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Wallet } from "../../redux/reducers/wallet.reducer";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import walletActions from "../../redux/actions/wallet";
import LoadingButton from "@mui/lab/LoadingButton";

type Props = {
  isOpen: boolean;
  onClose: (x: boolean) => void;
  wallet: Wallet;
};

type InputFields = {
  funding: number;
  spot: number;
};

const schema = yup
  .object({
    funding: yup.number().min(0).required(),
    spot: yup.number().min(0).required(),
  })
  .required();

const EditWallet = ({ isOpen, onClose, wallet }: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { _updateWallet } = bindActionCreators(walletActions, dispatch);

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<InputFields>({ resolver: yupResolver(schema) });

  const onSave: SubmitHandler<InputFields> = async (data) => {
    setLoading(true);

    const updatedWallet: Wallet = {
      ...wallet,
      fundingWallet: {
        ...wallet.fundingWallet,
        balance: data.funding,
        percentageChange:
          ((wallet.fundingWallet.balance - data.funding) /
            (wallet.fundingWallet.balance - data.funding)) *
          100,
      },

      spotWallet: {
        ...wallet.spotWallet,
        balance: data.spot,
        percentageChange:
          ((wallet.spotWallet.balance - data.spot) /
            (wallet.spotWallet.balance - data.spot)) *
          100,
      },

      totalBalance: data.funding + data.spot,
    };

    await _updateWallet(wallet._id, updatedWallet, (x: boolean) => {
      setLoading(x);
      onClose(false);
    });
  };

  const loadField = () => {
    setValue("funding", wallet.fundingWallet.balance);
    setValue("spot", wallet.spotWallet.balance);
  };

  useEffect(() => {
    isOpen && loadField();

    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClose={() => onClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`${wallet.user.name}'s Wallet`}</DialogTitle>
      <DialogContent>
        <Stack py={2} spacing={2.5}>
          <FormControl fullWidth>
            <Controller
              name="funding"
              control={control}
              rules={{ required: true }}
              defaultValue={wallet.fundingWallet.balance}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Funding Wallet"
                  variant="outlined"
                  placeholder="Balance"
                  error={errors.funding ? true : false}
                  {...field}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              name="spot"
              control={control}
              rules={{ required: true }}
              defaultValue={wallet.spotWallet.balance}
              render={({ field }) => (
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Spot Wallet"
                  variant="outlined"
                  placeholder="Balance"
                  error={errors.spot ? true : false}
                  {...field}
                />
              )}
            />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Discard</Button>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit(onSave)}
          autoFocus
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditWallet;
