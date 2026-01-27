import React, { useEffect, useState } from 'react'
import axiosInstance from '@/lib/axiosInstance';
import Select from "react-select";

function InputUsers({ formData, setFormData, errors, setErrors }) {
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(true)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (errors && errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: undefined,
            });
        }
    };

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await axiosInstance.get(`/roles`);
                setRoles(res.data.data.data)
            } catch (error) {
                console.error("Gagal memuat role:", error)
            }
            finally {
                setLoading(false); // ⬅️ Set loading ke false setelah data selesai di-load
            }
        }
        fetchRoles()
    }, [])
    const options = roles.map((role) => ({
        value: role.name,
        label: role.name,
    }));



    return (
        <>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Name"
                    required
                    autoFocus
                />
                {errors?.name && (
                    <small className="text-danger">{errors.name[0]}</small>
                )}
            </div>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="email"
                    required
                    autoFocus
                />
                {errors?.email && (
                    <small className="text-danger">{errors.email[0]}</small>
                )}
            </div>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="phone" className="form-label">No Telepon</label>
                <input
                    id="phone"
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="62 8123456789"
                    required
                />
                {errors?.phone && (
                    <small className="text-danger">{errors.phone[0]}</small>
                )}
            </div>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="roles" className="form-label">Role</label>
                <Select
                    id="roles"
                    name="roles"
                    options={options}
                    placeholder={loading ? "Memuat data role..." : "Pilih Role"}
                    value={options.find((opt) => opt.value === formData.roles) || null}
                    onChange={(selected) => handleChange({ target: { name: "roles", value: selected?.value } })}
                    isSearchable={false}
                    isLoading={loading}     // ⬅️ Aktifkan spinner bawaan react-select
                    isDisabled={loading}
                    className="form-control"
                    classNamePrefix="react-select"
                />
            </div>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="********"
                    required
                    autoComplete="current-password"
                />
            </div>
        </>
    )
}

export default InputUsers;
