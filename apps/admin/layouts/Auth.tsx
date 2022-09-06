import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router';

import Navbar from "components/Navbars/AuthNavbar"
import FooterSmall from "components/Footers/FooterSmall"

import { userStore } from 'store'

type AuthProps = {
  children: ReactNode
}

export default function Auth({ children }: AuthProps) {
  const router = useRouter();
  const user = userStore((state) => state.user)

  useEffect(() => {
      // redirect to admin dashboard if already logged in
    if (user) {
      router.push('/admin/dashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-slate-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}
          ></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
