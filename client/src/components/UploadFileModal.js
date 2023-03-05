import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import filesSlice from "../data/reducer/files";

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "20%",
    bottom: "20%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const UploadFileModal = () => {
  const MAX_FILE_SIZE = 200 * 1048; // 200 MB
  const MAX_FILE_SIZE_ON_SERVER = 5 * 1048 * 1048; // 200 MB
  const dispatch = useDispatch();
  const [value, setValues] = useState({
    id: "",
    uploader: "",
    description: "",
    uploadReason: "",
    date: "",
  });
  const currentDocSize = useSelector((state) =>
    state.files.currentDocSize ? state.files.currentDocSize : 0
  );

  console.log("currentDocSize", currentDocSize);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [err, setErr] = React.useState(true);
  const [errorMsg, setErrorMsg] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(undefined);

  const selectFile = (event) => {
    let isValid = false;
    let uploadFileSize = 0;
    for (const selectedFile of event.target.files) {
      const fileSizeKiloBytes = selectedFile.size / 1024;
      uploadFileSize = uploadFileSize + fileSizeKiloBytes;
      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        isValid = false;
        break;
      } else {
        isValid = true;
      }
    }
    if (isValid) {
      if (uploadFileSize + currentDocSize > MAX_FILE_SIZE_ON_SERVER) {
        setErrorMsg(
          "You can't upload more then 5GB on server and current server store data size File size is" +
            currentDocSize / (1048 * 1048) +
            "GB"
        );
      } else {
        setSelectedFiles(event.target.files);
      }
    } else {
      setErrorMsg("File size is greater than 200MB limit");
    }
  };

  useEffect(() => {
    setErr(
      !(
        selectedFiles &&
        value.uploader &&
        value.description &&
        value.uploadReason
      )
    );
  }, [value, selectedFiles]);

  const upload = () => {
    dispatch(
      filesSlice.actions.setNewRow({
        selectedFiles,
        value: { ...value, date: Date.now() },
      })
    );
    setValues({
      id: "",
      uploader: "",
      description: "",
      uploadReason: "",
      date: "",
    });
    closeModal();
  };

  function openModal() {
    setIsOpen(true);
  }

  const onChangeHandler = (e) => {
    setValues({ ...value, [e.target.name]: e.target.value });
  };
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <button
        className="my-3 btn btn-success btn-lg float-right"
        type="button"
        data-testid="docTitle"
        onClick={openModal}
      >
        Upload New Document
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="col-md-12">
          <span className="anchor" id="formLogin"></span>
          <div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="files">Files</label>
                  <input
                    className="form-control"
                    type="file"
                    id="files"
                    multiple
                    accept=" application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pdf, .doc, .docx,"
                    onChange={selectFile}
                  />
                  {errorMsg && (
                    <div className="mt-3 alert alert-danger" role="alert">
                      {errorMsg}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="uname">Uploader Name</label>
                  <input
                    className="form-control"
                    id="uname"
                    name="uploader"
                    value={value.uploader}
                    maxLength="40"
                    onChange={onChangeHandler}
                    required="*"
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    className="form-control"
                    id="description"
                    name="description"
                    maxLength="100"
                    value={value.description}
                    onChange={onChangeHandler}
                    required="*"
                    type="text"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="reason">Upload Reason</label>
                  <input
                    className="form-control"
                    id="reason"
                    maxLength="100"
                    onChange={onChangeHandler}
                    name="uploadReason"
                    value={value.uploadReason}
                    required="*"
                    type="text"
                  />
                </div>
                <button
                  className="ml-3 btn btn-success btn-lg float-right"
                  type="button"
                  disabled={err}
                  onClick={upload}
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
