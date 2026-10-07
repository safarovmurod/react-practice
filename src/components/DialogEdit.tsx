import { useBear } from "../store/store"

export default function DialogEdit({ user, setUser }: any) {
  const { EditUser } = useBear((state) => state)

  function EditUsersD(e: any) {
    e.preventDefault()
    const editUser = {
      id: user.id,
      name: e.target.name.value,
      age: Number(e.target.age.value),
      avatar: e.target.avatar.value || user.avatar || "/default-avatar.png",
      status: e.target.status.value === "true",
    }
    EditUser(editUser)
    setUser(null)
  }

  if (!user) {
    return null
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <dialog
        open={Boolean(user)}
        style={{
          border: "none",
          borderRadius: "16px",
          padding: "24px",
          width: "90%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          boxShadow: "0 20px 25px -5px rgba(15, 23, 42, 0.15), 0 8px 10px -6px rgba(15, 23, 42, 0.1)",
          position: "relative",
          margin: 0,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>
            Edit User Details
          </h2>
          <button
            type="button"
            onClick={() => setUser(null)}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#94a3b8",
              lineHeight: 1,
              padding: "4px 8px",
            }}
          >
            ×
          </button>
        </div>

        <form
          onSubmit={EditUsersD}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "5px", color: "#334155" }}>
              Full Name
            </label>
            <input
              type="text"
              defaultValue={user.name}
              name="name"
              required
              style={{
                width: "100%",
                padding: "9px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "5px", color: "#334155" }}>
              Age
            </label>
            <input
              type="number"
              defaultValue={user.age}
              name="age"
              required
              style={{
                width: "100%",
                padding: "9px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "5px", color: "#334155" }}>
              Avatar (Image URL)
            </label>
            <input
              type="text"
              defaultValue={user.avatar}
              name="avatar"
              placeholder="URL..."
              style={{
                width: "100%",
                padding: "9px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "5px", color: "#334155" }}>
              Status
            </label>
            <select
              name="status"
              defaultValue={user.status ? "true" : "false"}
              style={{
                width: "100%",
                padding: "9px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontSize: "14px",
                backgroundColor: "#ffffff",
                outline: "none",
              }}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Update Changes
            </button>
            <button
              type="button"
              onClick={() => setUser(null)}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#f1f5f9",
                color: "#475569",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  )
}

