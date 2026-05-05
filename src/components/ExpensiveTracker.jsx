import React, { useState } from "react";

const expenseCategories = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
];

export default function ExpenseTracker() {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [transactions, setTransactions] = useState([]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // ADD TRANSACTION
  const addTransaction = () => {
    if (!amount) return alert("Enter amount");

    if (type === "expense" && !category)
      return alert("Select category");

    const newTxn = {
      id: Date.now(),
      type,
      amount: Number(amount),
      category: type === "expense" ? category : "",
      note,
    };

    setTransactions([newTxn, ...transactions]);
    setAmount("");
    setCategory("");
    setNote("");
  };

  // DELETE
  const deleteTxn = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // UPDATE
  const handleUpdate = () => {
    if (!editData.amount) return alert("Enter amount");

    if (editData.type === "expense" && !editData.category)
      return alert("Select category");

    const updated = transactions.map((t) =>
      t.id === editData.id ? editData : t
    );

    setTransactions(updated);
    setIsEditOpen(false);
  };

  // SUMMARY CALCULATION
  const categorySummary = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => {
      const cat = curr.category || "Other";
      acc[cat] = (acc[cat] || 0) + curr.amount;
      return acc;
    }, {});

  const summaryArray = Object.entries(categorySummary);

  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = incomeTotal - expenseTotal;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-md mx-auto">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center text-purple-400 mb-4">
          Expense Tracker
        </h1>

        {/* BALANCE */}
        <div className="bg-gray-900 p-4 rounded-xl mb-4 text-center">
          <p>Balance</p>
          <h2 className="text-xl font-bold text-purple-400">₹ {balance}</h2>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-green-400">Income: ₹ {incomeTotal}</span>
            <span className="text-red-400">Expense: ₹ {expenseTotal}</span>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-gray-900 p-4 rounded-xl mb-4">
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setType("income")}
              className={`flex-1 py-2 rounded ${
                type === "income"
                  ? "bg-green-500"
                  : "bg-gray-700"
              }`}
            >
              Income
            </button>

            <button
              onClick={() => setType("expense")}
              className={`flex-1 py-2 rounded ${
                type === "expense"
                  ? "bg-red-500"
                  : "bg-gray-700"
              }`}
            >
              Expense
            </button>
          </div>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-2 p-2 rounded bg-gray-800 border border-gray-600"
          />

          {/* CATEGORY ONLY FOR EXPENSE */}
          {type === "expense" && (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mb-2 p-2 rounded bg-gray-800 border border-gray-600"
            >
              <option value="">Select Category</option>
              {expenseCategories.map((cat, i) => (
                <option key={i}>{cat}</option>
              ))}
            </select>
          )}

          <input
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full mb-2 p-2 rounded bg-gray-800 border border-gray-600"
          />

          <button
            onClick={addTransaction}
            className="w-full bg-purple-600 py-2 rounded"
          >
            Add Transaction
          </button>
        </div>

        {/* TRANSACTIONS */}
        <div className="space-y-3">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="bg-gray-900 p-3 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{t.note || "No Note"}</p>
                <p className="text-xs text-gray-400">
                  {t.type === "expense" ? t.category : "Income"}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={
                    t.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  ₹ {t.amount}
                </p>

                <div className="flex gap-2 text-xs">
                  <button
                    onClick={() => {
                      setEditData(t);
                      setIsEditOpen(true);
                    }}
                    className="text-blue-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTxn(t.id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CATEGORY SUMMARY */}
        <div className="mt-6 bg-gray-900 p-4 rounded-xl">
          <h3 className="text-purple-400 mb-3">
            Expense Summary
          </h3>

          {summaryArray.map(([cat, total]) => {
            const max = Math.max(...summaryArray.map(([, v]) => v));

            return (
              <div key={cat} className="mb-2">
                <div className="flex justify-between text-sm">
                  <span>{cat}</span>
                  <span>₹ {total}</span>
                </div>

                <div className="bg-gray-700 h-2 rounded">
                  <div
                    className="bg-purple-500 h-2 rounded"
                    style={{
                      width: `${(total / max) * 100}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditOpen && editData && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-xl w-[90%] max-w-md">

            <h2 className="text-purple-400 mb-4">
              Edit Transaction
            </h2>

            {/* TYPE */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() =>
                  setEditData({
                    ...editData,
                    type: "income",
                    category: "",
                  })
                }
                className={`flex-1 py-2 ${
                  editData.type === "income"
                    ? "bg-green-500"
                    : "bg-gray-700"
                }`}
              >
                Income
              </button>

              <button
                onClick={() =>
                  setEditData({
                    ...editData,
                    type: "expense",
                  })
                }
                className={`flex-1 py-2 ${
                  editData.type === "expense"
                    ? "bg-red-500"
                    : "bg-gray-700"
                }`}
              >
                Expense
              </button>
            </div>

            <input
              type="number"
              value={editData.amount}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  amount: e.target.value,
                })
              }
              className="w-full mb-2 p-2 bg-gray-800"
            />

            {editData.type === "expense" && (
              <select
                value={editData.category || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    category: e.target.value,
                  })
                }
                className="w-full mb-2 p-2 bg-gray-800"
              >
                <option value="">Select Category</option>
                {expenseCategories.map((cat, i) => (
                  <option key={i}>{cat}</option>
                ))}
              </select>
            )}

            <input
              type="text"
              value={editData.note || ""}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  note: e.target.value,
                })
              }
              className="w-full mb-3 p-2 bg-gray-800"
            />

            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-purple-600 py-2"
              >
                Update
              </button>

              <button
                onClick={() => setIsEditOpen(false)}
                className="flex-1 bg-gray-700 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}