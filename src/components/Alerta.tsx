import { PropsWithChildren } from "react";

export const Alerta = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="bg-red-100 border text-center font-semibold capitalize border-red-400 text-red-700 py-2 rounded"
      role="alert"
    >
      {children}
    </div>
  );
};
