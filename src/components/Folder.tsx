import { useState, KeyboardEvent, ChangeEvent } from "react";
import {
  VscChevronRight,
  VscChevronDown,
  VscFolder,
  VscFile,
  VscNewFolder,
  VscNewFile,
  VscEdit,
  VscTrash,
} from "react-icons/vsc";

interface FolderStruct {
  name: string;
  type: string;
  data?: FolderStruct[];
  meta?: string;
}

interface FolderProps {
  handleInsertFileOrFolder: (folderName: string, itemName: string, isFolder: boolean) => void;
  handleDeleteFileOrFolder: (folderName: string) => void;
  handleUpdateFileOrFolder: (name: string, updatedValue: string, isFolder: boolean) => void;
  explorerData: FolderStruct;
}

const Folder = ({
    handleInsertFileOrFolder,
    handleDeleteFileOrFolder,
    handleUpdateFileOrFolder,
  explorerData,
}: FolderProps) => {
  const [nodeName, setNodeName] = useState<string>(explorerData?.name || "");
  const [expand, setExpand] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<{ visible: boolean; isFolder: boolean | null }>({
    visible: false,
    isFolder: null,
  });
  const [updateInput, setUpdateInput] = useState<{ visible: boolean; isFolder: boolean | null }>({
    visible: false,
    isFolder: null,
  });

  const handleNewFolderButton = (e: React.MouseEvent<HTMLButtonElement>, isFolder: boolean) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleUpdateFolderButton = (
    e: React.MouseEvent<HTMLButtonElement>,
    isFolder: boolean,
    nodeValue: string
  ) => {
    setNodeName(nodeValue);
    e.stopPropagation();
    setUpdateInput({
      visible: true,
      isFolder,
    });
  };

  const handleDeleteFolder = (e: React.MouseEvent<HTMLButtonElement>, isFolder: boolean) => {
    e.stopPropagation();
    handleDeleteFileOrFolder(explorerData.name);
  };

  const onAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && (e.target as HTMLInputElement).value) {
        handleInsertFileOrFolder(explorerData.name, (e.target as HTMLInputElement).value, showInput.isFolder!);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onUpdate = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && (e.target as HTMLInputElement).value) {
        handleUpdateFileOrFolder(explorerData.name, (e.target as HTMLInputElement).value, true);
      setUpdateInput({ ...updateInput, visible: false });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNodeName(event.target.value);
  };

  if (explorerData.type === "folder") {
    return (
      <div>
        <div className="folder" style={{ cursor: "pointer" }} onClick={() => setExpand(!expand)}>
          <span>
            {expand ? <VscChevronDown /> : <VscChevronRight />} <VscFolder />
            {updateInput.visible ? (
              <input
                type="text"
                value={nodeName}
                onChange={handleChange}
                autoFocus
                onBlur={() => setUpdateInput({ ...updateInput, visible: false })}
                onKeyDown={onUpdate}
              />
            ) : (
              <label>{explorerData.name}</label>
            )}
          </span>

          <div className="buttons-container">
            <button onClick={(e) => handleDeleteFolder(e, true)}>
              <VscTrash />
            </button>
            <button onClick={(e) => handleUpdateFolderButton(e, true, explorerData.name)}>
              <VscEdit />
            </button>
            <button onClick={(e) => handleNewFolderButton(e, true)}>
              <VscNewFolder />
            </button>
            <button onClick={(e) => handleNewFolderButton(e, false)}>
              <VscNewFile />
            </button>
          </div>
        </div>

        <div id="folderContainer" style={{ display: expand ? "block" : "none", marginLeft: 20 }}>
          {showInput.visible && (
            <div className="addItem">
              <span>{showInput.isFolder ? <VscFolder /> : <VscFile />}</span>
              <input
                type="text"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={onAdd}
              />
            </div>
          )}
          {explorerData.data &&
            explorerData.data.map((item, index) => (
              <Folder
                key={index}
                handleDeleteFileOrFolder={handleDeleteFileOrFolder}
                handleInsertFileOrFolder={handleInsertFileOrFolder}
                handleUpdateFileOrFolder={handleUpdateFileOrFolder}
                explorerData={item}
              />
            ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="folder">
        <span>
          <VscFile />
          {updateInput.visible ? (
            <input
              type="text"
              value={nodeName}
              onChange={handleChange}
              autoFocus
              onBlur={() => setUpdateInput({ ...updateInput, visible: false })}
              onKeyDown={onUpdate}
            />
          ) : (
            <label>{explorerData.name}</label>
          )}
        </span>

        <div className="buttons-container">
          <button onClick={(e) => handleDeleteFolder(e, false)}>
            <VscTrash />
          </button>
          <button onClick={(e) => handleUpdateFolderButton(e, false, explorerData.name)}>
            <VscEdit />
          </button>
        </div>
      </div>
    );
  }
};

export default Folder;
