import React from 'react';

interface Expense {
  id: number;
  name: string;
  amount: string;
  date: string;
}

interface ModalProps {
  data: Expense | null;
  open: boolean;
  isEdit: boolean;
  onClose: () => void;
  handleData: (e: { target: { name: string; value: string } }) => void;
  handleNewExpense: () => void;
  handleEdit: () => void;
}

function Modal({
  data,
  open,
  isEdit,
  onClose,
  handleData,
  handleNewExpense,
  handleEdit
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
            <h3 className="text-3xl font-semibold">{isEdit ? 'Edit Expense' : 'Add Expense'}</h3>
            <button
              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
              type="button"
              onClick={onClose}
            >
              <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <form className="flex flex-col">
              <div className="flex space-x-2">
                <div className="mb-6 w-2/4">
                  <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="name">
                    Name of the expense
                  </label>
                  <input
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-[9px]"
                    id="name"
                    name="name"
                    placeholder="Ex: Travelling expense"
                    type="text"
                    value={data?.name || ''}
                    onChange={handleData}
                  />
                </div>
                <div className="mb-6 w-1/4">
                  <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="amount">
                    Amount
                  </label>
                  <input
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    id="amount"
                    name="amount"
                    placeholder="1000.00"
                    type="number"
                    value={data?.amount || ''}
                    onChange={handleData}
                  />
                </div>
                <div className="mb-6 w-1/4">
                  <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="date">
                    Date
                  </label>
                  <input
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    id="date"
                    name="date"
                    type="date"
                    value={data?.date || ''}
                    onChange={handleData}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
            <button
              className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
              type="button"
              onClick={isEdit ? handleEdit : handleNewExpense}
            >
              {isEdit ? 'Save Changes' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
