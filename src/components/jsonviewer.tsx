import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, ArrowLeft } from "lucide-react";

const JsonViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const jsonData = location.state?.jsonData;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!jsonData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-xl rounded-2xl glass-card border-white/20">
            <CardContent className="p-6">
              <p className="text-center text-gray-500">Nenhum dado JSON encontrado</p>
              <Button
                onClick={() => navigate('/users/import')}
                className="mt-4 rounded-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para Importação
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Visualização JSON</h1>
            <p className="text-sm text-gray-500">
              {jsonData.length} registos encontrados
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCopy}
              className="rounded-full"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copiar
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              className="rounded-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/users/import')}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
        </div>

        <Card className="border-none shadow-xl rounded-2xl glass-card border-white/20">
          <CardContent className="p-6">
            <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-[70vh] text-left">
              <pre className="text-sm text-gray-100 font-mono" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {JSON.stringify(jsonData, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JsonViewer;