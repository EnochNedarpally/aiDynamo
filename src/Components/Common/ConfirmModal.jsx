import axios from "axios";
import { toast } from "react-toastify";

const ConfirmModal = ({ url, navigate, token, setIsOpen, navigateUrl }) => {
  const handleCancel = () => {
    toast.dismiss()
    setIsOpen(false)
  }
  const handleConfirm = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.delete(url, config)
      if (res.status) {
        toast.warn("Category Deleted")
        navigate(navigateUrl)
      } else toast.error("Something went wrong")
    } catch (error) {
      console.log("error", error)
      toast.error(error)
    } finally {
      toast.dismiss()
    }

  }

  toast(
    <div>
      <h3>Are you sure you want to delete this item?</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={() => handleCancel()}
          className="cancel-btn"
        >
          Cancel
        </button>
        <button
          onClick={() => handleConfirm()}
          className="confirm-btn"
        >
          Confirm
        </button>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      pauseOnHover: false,
      closeButton: false,
    }
  );
};

export default ConfirmModal