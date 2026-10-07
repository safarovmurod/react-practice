import { useState } from "react"
import { useBear } from "../store/store"
import Dialog from "../components/Dialog"
import DialogEdit from "../components/DialogEdit"

export default function Home() {
  const { data, deleteUser } = useBear((state) => state)
  // dialogs state
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  return (
    <>
      {/* edit dialog */}
      <DialogEdit user={user} setUser={setUser} />
      {/* add dialog */}
      <Dialog open={open} setopen={setOpen} />

      <div style={{ maxWidth: "1060px", margin: "20px auto", padding: "0 16px" }}>
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "18px",
            marginBottom: "24px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  backgroundColor: "#f8fafc",
                  color: "#0f172a",
                  fontSize: "20px",
                  fontWeight: "700",
                  padding: "6px 16px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  textTransform: "capitalize",
                  letterSpacing: "-0.01em",
                }}
              >
                Users
              </span>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 18px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
            }}
          >
            <span style={{ fontSize: "16px", lineHeight: "1" }}>+</span> Add User
          </button>
        </div>

        {/* Cards Container */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "flex-start",
          }}
        >
          {data.map((el) => {
            return (
              <div
                key={el.id}
                style={{
                  width: "238px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "16px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "56px",
                    background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "11px",
                      fontWeight: "600",
                      padding: "3px 8px",
                      borderRadius: "12px",
                      backgroundColor: el.status ? "#f0fdf4" : "#f8fafc",
                      color: el.status ? "#166534" : "#64748b",
                      border: el.status ? "1px solid #bbf7d0" : "1px solid #e2e8f0",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: el.status ? "#22c55e" : "#94a3b8",
                      }}
                    />
                    {el.status ? "Active" : "Inactive"}
                  </span>
                </div>

                <div style={{ marginTop: "-38px", position: "relative" }}>
                  <img
                    src={el.avatar || "/default-avatar.png"}
                    style={{
                      width: "76px",
                      height: "76px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid #ffffff",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#ffffff",
                    }}
                    onError={(e: any) => {
                      e.currentTarget.src = "/default-avatar.png"
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: "12px 16px 16px 16px",
                    width: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexGrow: 1,
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#0f172a",
                      textAlign: "center",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {el.name}
                  </h3>

                  <span
                    style={{
                      color: "#64748b",
                      fontSize: "13px",
                      fontWeight: "500",
                      backgroundColor: "#f8fafc",
                      padding: "2px 10px",
                      borderRadius: "6px",
                      border: "1px solid #f1f5f9",
                      marginBottom: "14px",
                    }}
                  >
                    Age: {el.age}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      width: "100%",
                      marginTop: "auto",
                      paddingTop: "10px",
                      borderTop: "1px solid #f1f5f9",
                    }}
                  >
                    <button
                      onClick={() => setUser(el)}
                      style={{
                        flex: 1,
                        backgroundColor: "#f8fafc",
                        color: "#0f172a",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "7px 0",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(el.id)}
                      style={{
                        flex: 1,
                        backgroundColor: "#fff1f2",
                        color: "#e11d48",
                        border: "1px solid #ffe4e6",
                        borderRadius: "8px",
                        padding: "7px 0",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "13px",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

