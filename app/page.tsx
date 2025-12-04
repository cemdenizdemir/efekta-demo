"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

type Item = { id: string; inputText: string };

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  // edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    setItems(
      querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        inputText: docSnap.data().inputText as string,
      }))
    );
  };

  const handleAddItem = async () => {
    if (!inputText.trim()) return;
    await addDoc(collection(db, "items"), { inputText });
    setInputText("");
    fetchItems();
  };

  const handleDelete = (id: string) => async () => {
    if (!id) return;
    await deleteDoc(doc(db, "items", id));
    fetchItems();
  };

  // enter edit mode for a given item
  const handleEdit = (item: Item) => () => {
    setEditingId(item.id);
    setEditingText(item.inputText);
  };

  // save edit and exit edit mode
  const handleSaveEdit = async () => {
    if (!editingId) return;
    const ref = doc(db, "items", editingId);
    await updateDoc(ref, { inputText: editingText });
    setEditingId(null);
    setEditingText("");
    fetchItems();
  };

  // cancel edit without saving
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // handle Enter / Esc in edit input
  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveEdit();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="flex flex-col gap-2 max-w-3xl m-auto">
      <h1 className="mb-8">Next.js & Firebase - FlashStack Tutorial</h1>

      <div className="flex gap-2">
        <input
          type="text"
          className="border-2"
          placeholder="add item"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className="border p-2" onClick={handleAddItem}>
          Add
        </button>
      </div>

      <ul className="w-96 border-t mt-4 pt-4 text-white space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between bg-emerald-600 pl-2"
          >
            {/* toggle between text and input */}
            {editingId === item.id ? (
              <input
                className="flex-1 h-7 flex items-center text-black px-1"
                value={editingText}
                autoFocus
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={handleSaveEdit}
                onKeyDown={handleEditKeyDown}
              />
            ) : (
              <p className="flex-1 h-7 flex items-center">{item.inputText}</p>
            )}

            <div className="flex">
              {/* Edit toggle */}
              <button
                className="cursor-pointer h-7 w-7 bg-yellow-600 text-sm flex items-center justify-center"
                onClick={handleEdit(item)}
              >
                E
              </button>

              {/* Delete */}
              <button
                className="cursor-pointer h-7 w-7 bg-rose-600 text-sm flex items-center justify-center"
                onClick={handleDelete(item.id)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
