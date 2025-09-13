import React, { useState } from "react";
import { saveUser } from "../services/api";

export default function UserForm({ onSave }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    panCard: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveUser(form);
    onSave(); // refresh list
    setForm({ firstName: "", lastName: "", email: "", phone: "", panCard: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-2">
      <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required />
      <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required />
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />
      <input name="panCard" value={form.panCard} onChange={handleChange} placeholder="PAN" required />
      <button type="submit">Save User</button>
    </form>
  );
}
