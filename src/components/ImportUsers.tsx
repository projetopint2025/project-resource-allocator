import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Upload, FileUp, AlertCircle, Check, Copy, Download } from "lucide-react";
import * as XLSX from 'xlsx';
import { cn } from "@/lib/utils";

const ImportUsers = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showJson, setShowJson] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processExcel = async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      
      // Criar um objeto com todas as sheets
      const jsonData: { [key: string]: any[] } = {};
      
      // Processar cada sheet
      workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        jsonData[sheetName] = XLSX.utils.sheet_to_json(worksheet);
      });

      setPreview(jsonData);
      setShowJson(true);
      setError(null);
    } catch (err) {
      setError("Erro ao processar o ficheiro. Certifique-se que é um ficheiro XLSX válido.");
      console.error(err);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setFile(droppedFile);
      processExcel(droppedFile);
    } else {
      setError("Por favor, envie apenas ficheiros XLSX");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      processExcel(selectedFile);
    }
  };

  const handleImport = () => {
    if (preview.length > 0) {
      setShowJson(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 custom-blue-blur">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Importar Utilizadores</h1>
            <p className="text-sm text-gray-500">Importe utilizadores a partir de um ficheiro Excel</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/users")}
            className="rounded-full"
          >
            Voltar
          </Button>
        </div>

        <Card className="border-none shadow-xl rounded-2xl glass-card border-white/20">
          <CardContent className="p-6">
            <div
              className={cn(
                "border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out text-center",
                isDragging ? "border-azul bg-blue-50/50" : "border-gray-200 hover:border-azul/50",
                error && "border-red-300 bg-red-50/50"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-4">
                <div className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center transition-all duration-200",
                  isDragging ? "bg-blue-100 text-azul" : "bg-gray-100 text-gray-600",
                  error && "bg-red-100 text-red-600"
                )}>
                  {error ? (
                    <AlertCircle className="h-6 w-6" />
                  ) : (
                    <Upload className="h-6 w-6" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    {error || "Arraste o seu ficheiro XLSX ou clique para selecionar"}
                  </p>
                  <p className="text-xs text-gray-500">
                    XLSX até 10MB
                  </p>
                </div>

                <input
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className="rounded-full"
                >
                  <FileUp className="h-4 w-4 mr-2" />
                  Selecionar Ficheiro
                </Button>
              </div>
            </div>

            {Object.keys(preview).length > 0 && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <Check className="h-5 w-5" />
                  <p className="text-sm">
                    {Object.keys(preview).length} sheets encontradas no ficheiro
                  </p>
                </div>

                <Card className="mt-4 border-none shadow-xl rounded-2xl glass-card border-white/20">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">JSON Gerado</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const jsonStr = JSON.stringify(preview, null, 2);
                          navigator.clipboard.writeText(jsonStr);
                        }}
                        className="rounded-full"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar JSON
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const blob = new Blob([JSON.stringify(preview, null, 2)], { type: 'application/json' });
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'users.json';
                          a.click();
                          window.URL.revokeObjectURL(url);
                        }}
                        className="rounded-full"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download JSON
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(preview).map(([sheetName, data]) => (
                        <div key={sheetName} className="space-y-2">
                          <h4 className="text-md font-semibold text-gray-700">
                            Sheet: {sheetName} ({(data as any[]).length} registos)
                          </h4>
                          <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-[300px] text-left">
                            <pre className="text-sm text-gray-100 font-mono" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                              {JSON.stringify(data, null, 2)}
                            </pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFile(null);
                      setPreview({});
                      setShowJson(false);
                    }}
                    className="rounded-full"
                  >
                    Limpar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImportUsers;