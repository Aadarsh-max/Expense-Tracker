import React, { useState } from "react";
import Input from "../../components/Inputs/Input";
import EmojiPickerPopup from "../Layouts/EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense = () => {} }) => {
  const [income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setIncome((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const { category, amount, date, icon } = income;
    if (!category || !amount || !date) {
      alert("Please fill all the fields including an icon.");
      return;
    }

    // Optional: Convert amount to number
    onAddExpense({ ...income, amount: Number(amount) });

    // Optional: Reset form
    setIncome({
      category: "",
      amount: "",
      date: "",
      icon: "",
    });
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc"
        type="text"
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
