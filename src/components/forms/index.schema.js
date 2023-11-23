import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Forneça um email válido"),
  password: z.string().min(8, "São necessários pelo menos 8 caracteres"),
});

export const registerAdminSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatótio"),
    email: z
      .string()
      .min(1, "E-mail é obrigatório")
      .email("Forneça um e-mail válido"),
    password: z
      .string()
      .min(8, "São necessários pelo menos 8 caracteres")
      .regex(/[a-z]+/, "É necessário pelo menos uma letra minúscula")
      .regex(/[A-Z]+/, "É necessário pelo menos uma letra maiúscula")
      .regex(/[0-9]+/, "A senha deve conter pelo menos um número")
      .regex(
        /[!@#$%^&*()_+,/{}:;>=<?]+/,
        "A senha deve conter pelo menos um caractere especial",
      ),
    passValidate: z.string().min(1, "A confirmação de senha é obrigatória"),
  })
  .refine(({ password, passValidate }) => password === passValidate, {
    message: "As senhas não correspondem",
    path: ["passValidate"],
  });

export const productSchema = z
  .object({
    name: z.string().min(1, "O nome do produto é obrigatótio"),
    price: z.string().min(1, "O valor do produto é obrigatório"),
    description: z.string().min(1, "A descrição do produto é obrigatótia"),
    image: z.string().url("Forneça uma url válida").min(1, "Url é obrigatória"),
  })
  .refine(({ price }) => Number(price) >= 0, {
    message: "forneça um valor válido",
    path: ["price"],
  });
