import { useState } from "react";
import "./App.css";
import useFolderTree from "./hooks/use-folder-tree";
import folderData from "./data/folderData";
import Folder from "./components/Folder";

interface FolderNode {
  name: string;
  type: string;
  meta?: string;
  data?: FolderNode[];
}

function App() {
  const [explorerData, setExplorerData] = useState<FolderNode>(folderData);
  const { insertNode, deleteNode, updateNode } = useFolderTree();

  const handleInsertFileOrFolder = (folderName: string, itemName: string, isFolder: boolean) => {
    const finalItem = insertNode(explorerData, folderName, itemName, isFolder);
    if (finalItem) {
      setExplorerData({ ...finalItem });
    }
  };

  const handleDeleteFileOrFolder = (folderName: string) => {
    const finalItem = deleteNode(explorerData, folderName);
    if (finalItem) {
      setExplorerData(finalItem);
    } else {
      console.warn("Node not found or deletion failed.");
      setExplorerData(explorerData);
    }
  };

  const handleUpdateFileOrFolder = (folderName: string, updatedValue: string) => {
    const finalItem = updateNode(explorerData, folderName, updatedValue);
    setExplorerData(finalItem);
  };

  return (
    <div className="App">
      <div className="folderContainerBody">
        <div className="folder-container">
          <Folder
            handleInsertFileOrFolder={handleInsertFileOrFolder}
            handleDeleteFileOrFolder={handleDeleteFileOrFolder}
            handleUpdateFileOrFolder={handleUpdateFileOrFolder}
            explorerData={explorerData}
          />
        </div>
        <div className="empty-state">Your content will be here</div>
      </div>
    </div>
  );
}

export default App;