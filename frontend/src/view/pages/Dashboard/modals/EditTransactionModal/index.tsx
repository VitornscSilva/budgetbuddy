import { Controller } from "react-hook-form";
import { Transaction } from "../../../../../app/entities/Transaction";
import { Button } from "../../../../components/Button";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { useEditTransactionModalController } from "./useEditTransactionModalController";

interface EditTransactionModalProps {
  open: boolean;
  onClose(): void;
  transaction: Transaction | null;
}

export function EditTransactionModal({ transaction, onClose, open }: EditTransactionModalProps) {
  const {
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === 'EXPENSE';

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteTransaction}
        onClose={handleCloseDeleteModal}
        title={`Are you sure you want to delete this ${isExpense ? 'expense' : 'income'}?`}
      />
    );
  }

  return (
    <Modal
      title={isExpense ? 'Edit Expense' : 'Edit Income'}
      open={open}
      onClose={onClose}
      rightAction={(
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Amount {isExpense ? 'of expense' : 'of income'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Expense Name' : 'Income Name'}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Category"
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                options={categories.map(category => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isExpense ? 'Pay with' : 'Receive with'}
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                options={accounts.map(account => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Save
        </Button>
      </form>
    </Modal>
  );
}
