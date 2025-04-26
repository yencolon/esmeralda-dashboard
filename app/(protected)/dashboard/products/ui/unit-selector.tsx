"use client";

import getUnits from "@/app/actions/unit-actions";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Unit } from "@/interfaces/rest/products";
import { useEffect, useState } from "react";

interface UnitSelectorProps {
  defaultUnit?: number;
  disabled?: boolean;
}

export default function UnitSelector({
  defaultUnit,
  disabled,
}: UnitSelectorProps) {
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    const fetchUnits = async () => {
      const response = await getUnits();
      setUnits(response.data.units);
    };
    fetchUnits();
  }, []);

  const defaultValue = defaultUnit ? defaultUnit.toString() : undefined;

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Unidad</Label>
      <Select
        name="unit"
        defaultValue={defaultValue}
        disabled={disabled}
        required
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccione una unidad" />
        </SelectTrigger>
        <SelectContent>
          {units.map((unit) => (
            <SelectItem key={unit.id} value={unit.id.toString()}>
              {`${unit.name} (${unit.abbreviation})`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
