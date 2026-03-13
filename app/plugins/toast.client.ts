export default defineNuxtPlugin(async (app) => {
  const toast = useToast();

  return { provide: { toast } };
});
