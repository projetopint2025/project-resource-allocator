
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Simulação de login básico
    if (email && password) {
      navigate("/");
    } else {
      setError("Por favor preencha todos os campos");
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Animation and Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-customBlue/20">
        {/* Fixed gradient background with blur */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(120deg, rgba(255,255,255,0.9) 0%, rgba(59,130,246,0.5) 100%)",
            backdropFilter: "blur(16px)"
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 z-10">
          <div className="w-full max-w-md">
            <img
              src="/lovable-uploads/28745dc3-1b1b-490b-8612-41cb26f8c61d.png"
              alt="STAR Institute"
              className="h-20 mb-12 drop-shadow-lg"
            />
            <h1 className="text-4xl font-bold text-customBlue mb-6">
              STARSoftFlow
            </h1>
            <p className="text-lg text-customBlue/80">
              Acompanhe em tempo real o progresso, simplifique a alocação de recursos e maximize a sua 
              eficiência.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white relative">
        <div className="w-full max-w-md px-6 py-12 sm:px-12">
          {/* Logo for mobile only */}
          <div className="flex justify-center mb-12 lg:hidden">
            <img
              src="/lovable-uploads/28745dc3-1b1b-490b-8612-41cb26f8c61d.png"
              alt="STAR Institute"
              className="h-10 w-auto"
            />
          </div>

          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Bem-vindo</h2>
              <p className="text-gray-500 mt-2">Entre para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border-0 px-4 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customBlue transition-all duration-200"
                  placeholder="utilizador@starinstitute.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Palavra-passe
                  </label>
                  <Button variant="link" className="text-sm font-medium text-customBlue hover:text-customBlue/80 p-0 h-auto">
                    Esqueceu-se?
                  </Button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border-0 px-4 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customBlue pr-10 transition-all duration-200"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-customBlue focus:ring-customBlue"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
                  Lembrar-me
                </label>
              </div>

              <Button
                type="submit"
                className="flex w-full justify-center rounded-xl bg-customBlue px-4 py-6 text-sm font-semibold text-white shadow-sm hover:bg-customBlue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue transition-all duration-200"
              >
                Entrar
              </Button>
            </form>

            {/* Footer */}
            <footer className="mt-8 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} STAR Institute. Todos os direitos reservados.
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
