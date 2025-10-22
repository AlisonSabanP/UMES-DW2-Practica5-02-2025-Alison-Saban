import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './App.css'


const schema = z.object({
  primer_nombre: z.string().min(1),
  segundo_nombre: z.string(),
  primer_apellido: z.string().min(1),
  segundo_apellido: z.string(),
  email: z.string().email(),
  telefono: z.string().min(1),
  direccion: z.string().min(1),
});

export default function App() {
  const [clientes, setClientes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      email: '',
      telefono: '',
      direccion: '',
    },
  });

  const onSubmit = (data) => {
    setClientes([...clientes, { ...data, id: Date.now() }]);
    reset();
    setShowForm(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>

      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowForm(true)}
      >
        Agregar cliente
      </button>

      <div className="space-y-2">
        {clientes.map((cliente) => (
          <div key={cliente.id} className="p-3 border rounded">
            {cliente.primer_nombre} {cliente.segundo_nombre} {cliente.primer_apellido} {cliente.segundo_apellido}
          </div>
        ))}
      </div>

      {showForm && (
        <div className="mt-6 p-4 border rounded bg-base-100">
          <h2 className="text-xl font-semibold mb-3">Nuevo cliente</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input
              {...register('primer_nombre')}
              placeholder="Primer nombre *"
              className="input input-bordered w-full"
            />
            {errors.primer_nombre && <p className="text-red-500 text-sm">Requerido</p>}

            <input
              {...register('segundo_nombre')}
              placeholder="Segundo nombre"
              className="input input-bordered w-full"
            />

            <input
              {...register('primer_apellido')}
              placeholder="Primer apellido *"
              className="input input-bordered w-full"
            />
            {errors.primer_apellido && <p className="text-red-500 text-sm">Requerido</p>}

            <input
              {...register('segundo_apellido')}
              placeholder="Segundo apellido"
              className="input input-bordered w-full"
            />

            <input
              {...register('email')}
              type="email"
              placeholder="Email *"
              className="input input-bordered w-full"
            />
            {errors.email && <p className="text-red-500 text-sm">Email inválido</p>}

            <input
              {...register('telefono')}
              placeholder="Teléfono *"
              className="input input-bordered w-full"
            />
            {errors.telefono && <p className="text-red-500 text-sm">Requerido</p>}

            <input
              {...register('direccion')}
              placeholder="Dirección *"
              className="input input-bordered w-full"
            />
            {errors.direccion && <p className="text-red-500 text-sm">Requerido</p>}

            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}