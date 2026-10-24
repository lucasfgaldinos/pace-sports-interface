import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Button, Input } from '../../components';
import { api } from '../../services/api';
import { formatCurrency } from '../../utils/formatCurrency';

export const NewProduct = () => {
  const [fileName, setFileName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const schema = yup
    .object({
      name: yup
        .string()
        .min(3, 'O nome deve ter no mínimo 3 caracteres')
        .max(100, 'O nome não pode ter mais que 100 caracteres')
        .required('O nome é obrigatório'),
      price: yup
        .number()
        .typeError('Informe o preço')
        .integer()
        .min(100, 'O preço deve ser maior que 1 real')
        .required('Informe o preço'),
      description: yup.string().required('A descrição é obrigatória'),
      category: yup.object().required('Escolha a categoria'),
      file: yup
        .mixed()
        .test('required', 'Escolha uma imagem para continuar', (value) => {
          return value && value.length > 0;
        })
        .test('fileSize', 'Tamanho máximo: 1MB', (value) => {
          return !value?.length || value[0].size < 1000000;
        }),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: '', price: null, description: '', category: null },
  });

  function formatCents(value) {
    if (value === null || value === undefined || value === '') return '';
    return formatCurrency(value);
  }

  function extractCents(text) {
    const digits = text.replace(/\D/g, '').slice(0, 7);
    return digits ? Number(digits) : null;
  }

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('file', data.file[0]);
    formData.append('category_id', data.category.id);

    try {
      setIsLoading(true);
      const { status } = await api.post('/products', formData, {
        validateStatus: () => true,
      });
      if (status === 201) {
        toast.success('Produto cadastrado no sistema');
        reset();
        setFileName(null);
      } else if (status === 400) {
        toast.error('Verifique se os campos estão corretos e tente novamente');
      } else {
        throw new Error();
      }
    } catch (_err) {
      toast.error('Erro ao cadastrar novo produto');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getCategories() {
      try {
        const { data, status } = await api.get('/categories', {
          validateStatus: () => true,
        });

        if (status === 200) {
          setCategories(data);
        } else throw new Error();
      } catch (_err) {
        toast.error('Erro ao buscar categorias');
      }
    }

    getCategories();
  }, []);

  return (
    <div className="h-dvh flex items-center justify-center">
      <form
        className="p-6 w-full max-w-md max-h-full overflow-auto shadow rounded-2xl bg-white border border-neutral/20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="font-bold text-2xl mb-4 text-center">Novo produto</p>

        <Input
          id={'new-product-name'}
          type="text"
          {...register('name')}
          label={'Nome'}
          placeholder={'Nome'}
          errorMessage={errors.name?.message}
        />

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Input
              id={'new-product-price'}
              label={'Preço'}
              type="text"
              inputMode="numeric"
              placeholder="R$ 0,00"
              value={formatCents(field.value)}
              onChange={(e) => field.onChange(extractCents(e.target.value))}
              onBlur={field.onBlur}
              ref={field.ref}
              errorMessage={errors.price?.message}
            />
          )}
        />

        <Input
          id={'new-product-description'}
          type="text"
          {...register('description')}
          label={'Descrição'}
          placeholder={'Descrição...'}
          errorMessage={errors.description?.message}
        />

        <div className="my-6">
          <label className="flex items-center h-10 px-3 text-xs text-label border-2 border-dashed border-light-border rounded-xl cursor-pointer">
            <input
              className="cursor-pointer"
              type="file"
              {...register('file')}
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => {
                setFileName(e.target.files[0]?.name);
                register('file').onChange(e);
              }}
            />
            {fileName || 'Imagem do produto'}
          </label>
          <p className="h-0 text-pace-red text-[10px] tracking-wide">
            {errors.file?.message}
          </p>
        </div>

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <div>
              <Select
                {...field}
                menuPortalTarget={document.body}
                menuPlacement={'auto'}
                placeholder="Selecione a categoria"
                options={categories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => category.id}
              />

              <p className="h-0 text-pace-red text-[10px] tracking-wide">
                {errors.category?.message}
              </p>
            </div>
          )}
        />

        <div className="mt-8">
          <Button isLoading={isLoading} type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
};
