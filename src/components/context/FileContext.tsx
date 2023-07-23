import { createContext, useContext, useState, ReactNode } from 'react';

// Определение типа для состояния файла
interface AppState {
  selectedFile: File | null;
}

// Определение типа для контекста
interface FileContextType extends AppState {
  setSelectedFile: (file: File | null) => void;
}

const FileContext = createContext<FileContextType | null>(null);

export const useFileContext = (): FileContextType => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FileProvider');
  }
  return context;
};

export const FileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <FileContext.Provider value={{ selectedFile, setSelectedFile }}>
      {children}
    </FileContext.Provider>
  );
};
