import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log("Data Registrasi:", data);
    setIsSubmitted(true);
    reset({ agreeToTerms: false });
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => setIsSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Formulir Registrasi Tech Conference</h2>

      {isSubmitted && <p style={{ color: "green" }}>Registrasi Berhasil!</p>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label>Nama Lengkap</label>
          <input
            {...register("fullName", { required: "Nama lengkap wajib diisi" })}
          />
          {errors.fullName && (
            <p style={{ color: "red" }}>{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label>Username</label>
          <input
            {...register("username", {
              required: "Username wajib diisi",
              minLength: { value: 6, message: "Minimal 6 karakter" },
              maxLength: { value: 20, message: "Maksimal 20 karakter" },
            })}
          />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Format email salah",
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password wajib diisi",
              minLength: { value: 6, message: "Password minimal 6 karakter" },
            })}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <div>
          <label>Umur</label>
          <input
            type="number"
            {...register("age", {
              required: "Umur wajib diisi",
              min: { value: 18, message: "Minimal 18 tahun" },
              max: { value: 100, message: "Maksimal 100 tahun" },
            })}
          />
          {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
        </div>

        <div>
          <label>Tipe Tiket</label>
          <select {...register("ticketType", { required: "Pilih tipe tiket" })}>
            <option value="">-- Pilih Tipe Tiket --</option>
            <option value="General">General</option>
            <option value="VIP">VIP</option>
            <option value="Student">Student</option>
          </select>
          {errors.ticketType && (
            <p style={{ color: "red" }}>{errors.ticketType.message}</p>
          )}
        </div>

        <div>
          <label>Situs Web Pribadi (opsional)</label>
          <input
            {...register("websiteUrl", {
              pattern: {
                value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
                message: "Format URL tidak valid",
              },
            })}
          />
          {errors.websiteUrl && (
            <p style={{ color: "red" }}>{errors.websiteUrl.message}</p>
          )}
        </div>

        {/* ✅ Checkbox now fixed */}
        <div style={{ marginTop: "12px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            <input
              type="checkbox"
              style={{ width: "16px", height: "16px" }}
              {...register("agreeToTerms", {
                required: "Harus setuju dengan syarat & ketentuan",
              })}
            />
            <span>Saya setuju dengan syarat & ketentuan</span>
          </label>
          {errors.agreeToTerms && (
            <p style={{ color: "red" }}>{errors.agreeToTerms.message}</p>
          )}
        </div>

        <button
          type="submit"
          style={{
            marginTop: "16px",
            background: "#2563eb",
            color: "white",
            padding: "10px 16px",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Daftar
        </button>
      </form>
    </div>
  );
}
