interface Struct {
    type: string; 
    name: string;
    data?: Struct[];
    meta?: string;
  }
  
  const useFolderTree = () => {
    function insertNode(tree: Struct, folderName: string, itemName: string, isFolder: boolean): Struct | undefined {
      if (tree.name === folderName && tree.type === "folder") {
        tree.data = tree.data || [];
        tree.data.unshift({
          type: isFolder ? "folder" : "file",
          name: itemName,
          ...(isFolder ? { data: [] } : { meta: "" })
        });
        return tree;
      }
      if (tree.data) {
        tree.data = tree.data.map((obj) => {
          let res = insertNode(obj, folderName, itemName, isFolder);
          return res ? res : obj;
        });
      }
  
      return tree;
    }
  
    function deleteNode(tree: Struct, folderName: string): Struct | null {
      if (tree.name === folderName) {
        return null;
      }
  
      if (tree.data && tree.data.length > 0) {
        tree.data = tree.data
          .map((child) => deleteNode(child, folderName))
          .filter(Boolean) as Struct[];
      }
  
      return { ...tree };
    }
  
    function updateNode(tree: Struct, folderName: string, itemName: string): Struct {
      if (tree.name === folderName) {
        return {
          ...tree,
          name: itemName,
        };
      }
  
      if (tree.data && tree.data.length > 0) {
        tree.data = tree.data.map((child) =>
          updateNode(child, folderName, itemName)
        );
      }
  
      return { ...tree };
    }
  
    return { insertNode, deleteNode, updateNode };
  };
  
  export default useFolderTree;
  