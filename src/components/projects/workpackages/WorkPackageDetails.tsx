
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileText, Package, Pencil, Trash2, Plus, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { WorkPackage, Material } from '@/types/project';

interface WorkPackageDetailsProps {
  workPackage: WorkPackage;
  onClose: () => void;
  onEdit?: () => void;
}

export function WorkPackageDetails({ workPackage, onClose, onEdit }: WorkPackageDetailsProps) {
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [newMaterial, setNewMaterial] = useState<Partial<Material>>({
    name: '',
    units: 0,
    unitPrice: 0,
    category: 'MATERIAIS'
  });

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMM yyyy', { locale: ptBR });
  };

  const handleAddMaterial = () => {
    // Adicionar material
    console.log('Adicionar material:', newMaterial);
    setShowAddMaterial(false);
    setNewMaterial({
      name: '',
      units: 0,
      unitPrice: 0,
      category: 'MATERIAIS'
    });
  };

  const totalMaterials = workPackage.materials.reduce(
    (sum, material) => sum + (material.units * material.unitPrice), 
    0
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-customBlue tracking-tight">
            {workPackage.name}
          </h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onEdit} 
            className="h-8 w-8 rounded-full bg-customBlue-subtle hover:bg-customBlue/20 text-customBlue"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Badge 
            className={`${
              workPackage.status === 'completed' 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                : 'bg-amber-50 text-amber-600 border-amber-200'
            }`}
          >
            {workPackage.status === 'completed' ? 'Concluído' : 'Em Progresso'}
          </Badge>
          <div className="text-sm text-customBlue/60">
            {formatDate(workPackage.startDate)} - {formatDate(workPackage.endDate)}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="bg-white/70 backdrop-blur-sm border border-customBlue/10 shadow-lg rounded-xl overflow-hidden">
        <div className="p-6 flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-customBlue/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-customBlue" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-medium text-customBlue">Descrição</h3>
            <p className="text-sm text-customBlue/80 leading-relaxed mt-2">
              {workPackage.description || "Sem descrição"}
            </p>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-customBlue/10 flex items-center justify-center">
            <Package className="h-5 w-5 text-customBlue" />
          </div>
          <h3 className="text-base font-medium text-customBlue">Materiais</h3>
        </div>
        <Button 
          onClick={() => setShowAddMaterial(true)} 
          className="bg-customBlue/10 hover:bg-customBlue/20 text-customBlue border-customBlue/20 rounded-xl"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Material
        </Button>
      </div>

      <Card className="bg-white/70 backdrop-blur-sm border border-customBlue/10 shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-hidden rounded-xl">
          <div className="bg-customBlue/5 grid grid-cols-5 gap-4 px-6 py-3">
            <div className="text-sm font-medium text-customBlue">Nome</div>
            <div className="text-sm font-medium text-customBlue">Rubrica</div>
            <div className="text-sm font-medium text-customBlue">Quantidade</div>
            <div className="text-sm font-medium text-customBlue">Preço Unit.</div>
            <div className="text-sm font-medium text-customBlue">Total</div>
          </div>

          {showAddMaterial && (
            <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-customBlue/5 border-t border-customBlue/10">
              <div>
                <Input 
                  value={newMaterial.name}
                  onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                  placeholder="Nome do material"
                  className="bg-white/80 border-customBlue/20 focus:border-customBlue focus:ring-customBlue/20 rounded-xl h-9"
                />
              </div>
              <div>
                <Input 
                  value={newMaterial.category}
                  onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value})}
                  placeholder="Rubrica"
                  className="bg-white/80 border-customBlue/20 focus:border-customBlue focus:ring-customBlue/20 rounded-xl h-9"
                />
              </div>
              <div>
                <Input 
                  type="number"
                  value={newMaterial.units || ''}
                  onChange={(e) => setNewMaterial({...newMaterial, units: parseInt(e.target.value) || 0})}
                  placeholder="Quantidade"
                  className="bg-white/80 border-customBlue/20 focus:border-customBlue focus:ring-customBlue/20 rounded-xl h-9"
                />
              </div>
              <div>
                <Input 
                  type="number"
                  value={newMaterial.unitPrice || ''}
                  onChange={(e) => setNewMaterial({...newMaterial, unitPrice: parseFloat(e.target.value) || 0})}
                  placeholder="Preço unitário"
                  className="bg-white/80 border-customBlue/20 focus:border-customBlue focus:ring-customBlue/20 rounded-xl h-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={handleAddMaterial} 
                  className="bg-customBlue text-white hover:bg-customBlue/90 rounded-xl h-9"
                >
                  Adicionar
                </Button>
                <Button 
                  onClick={() => setShowAddMaterial(false)} 
                  variant="ghost" 
                  className="text-customBlue/60 hover:text-customBlue rounded-xl h-9"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          <div className="divide-y divide-customBlue/10">
            {workPackage.materials && workPackage.materials.length > 0 ? (
              workPackage.materials.map((material) => (
                <div key={material.id} className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-customBlue/5">
                  <div className="text-sm text-customBlue/80">{material.name}</div>
                  <div className="text-sm text-customBlue/80">{material.category || 'MATERIAIS'}</div>
                  <div className="text-sm text-customBlue/80">{material.units}</div>
                  <div className="text-sm text-customBlue/80">{material.unitPrice.toFixed(2)} €</div>
                  <div className="text-sm text-customBlue/80 font-medium">
                    {(material.units * material.unitPrice).toFixed(2)} €
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-sm text-customBlue/60">Não há materiais adicionados</p>
              </div>
            )}
          </div>

          {workPackage.materials && workPackage.materials.length > 0 && (
            <div className="bg-white border-t border-customBlue/10 px-6 py-4 flex justify-end">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 text-right text-sm font-medium text-customBlue">Total</div>
                <div className="text-sm font-semibold text-customBlue">{totalMaterials.toFixed(2)} €</div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
