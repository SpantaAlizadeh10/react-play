/* eslint-disable react/jsx-sort-props */
import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import PlayHeader from 'common/playlists/PlayHeader';
import useLocalStorage from 'common/hooks/useLocalStorage';
import Modal from './components/modal';

interface Expense {
  id: number;
  name: string;
  amount: string;
  date: string;
}

function ExpensesTracker(props: any) {
  const [localStoreExpenses, setLocalStoreExpenses] = useLocalStorage('et-expenses', []);
  const [localStoreTotal, setLocalStoreTotal] = useLocalStorage('et-total', 0);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Expense | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleData = (e: { target: { name: string; value: string } }) => {
    setData((prevData) => ({
      ...(prevData || { id: 0, name: '', amount: '', date: '' }),
      [e.target.name]: e.target.value
    }));
  };

  const handleNewExpense = () => {
    if (!data) return;
    
    const expense = localStoreExpenses[localStoreExpenses.length - 1];
    const sanitizedData = {
      ...data,
      amount: data.amount || '0'
    };
    sanitizedData.id = expense !== undefined ? parseInt(expense.id) + 1 : 1;
    setLocalStoreExpenses([...localStoreExpenses, sanitizedData]);
    setLocalStoreTotal(parseFloat(localStoreTotal) + parseFloat(sanitizedData.amount));
    setOpen(false);
    setData(null);
  };

  const openEditModal = (expenseEdit: Expense) => {
    setIsEdit(true);
    setData(expenseEdit);
    setOpen(true);
  };

  const handleEdit = () => {
    if (!data) return;
    
    const index = localStoreExpenses.findIndex((expense: Expense) => expense.id === data.id);
    const oldAmount: number = parseFloat(localStoreExpenses[index].amount);
    const newAmount: number = parseFloat(data.amount);
    setLocalStoreTotal(localStoreTotal - oldAmount + newAmount);
    localStoreExpenses[index] = data;
    setLocalStoreExpenses(localStoreExpenses);
    setOpen(false);
    setData(null);
  };

  const handleDelete = (id: number) => {
    const expense = localStoreExpenses.find((expense: Expense) => expense.id === id);
    if (expense) {
      setLocalStoreTotal(localStoreTotal - parseFloat(expense.amount));
      setLocalStoreExpenses(localStoreExpenses.filter((expense: Expense) => expense.id !== id));
    }
  };

  return (
    <div className="play-details">
      <PlayHeader play={props} />
      <div className="play-details-body">
        <div className="w-11/12 md:w-4/5 mx-auto my-4 flex justify-between items-center">
          <h3>Total: ${localStoreTotal}</h3>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setOpen(true);
              setIsEdit(false);
              setData(null);
            }}
          >
            Add Expense
          </button>
        </div>
        <div className="w-11/12 md:w-4/5 mx-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {localStoreExpenses.map((expense: Expense) => (
                <tr key={expense.id}>
                  <td className="py-2">{expense.name}</td>
                  <td className="py-2">${expense.amount}</td>
                  <td className="py-2">{expense.date}</td>
                  <td className="py-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => openEditModal(expense)}
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(expense.id)}
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          data={data}
          open={open}
          isEdit={isEdit}
          onClose={() => setOpen(false)}
          handleData={handleData}
          handleNewExpense={handleNewExpense}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default ExpensesTracker;
