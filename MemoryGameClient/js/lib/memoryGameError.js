export function MemoryGameError(message, method, file, info)
{
  let error = new Error(message);
  error.method = method;
  error.fileName = file;
  error.information = info;

  return error;
}
