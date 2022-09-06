import { ReactElement } from "react"
import { useRouter } from 'next/router';
import { useFormik } from 'formik'
import * as Yup from 'yup'

import AuthLayout from "layouts/Auth"
import { userStore } from 'store'
import type { NextPageWithLayout } from 'pages/_app'

import firebase from "../../firebase/clientApp";

const Register: NextPageWithLayout = () => {
  const router = useRouter();
  const setUser = userStore((state) => state.setUser)

  const formik = useFormik({
    initialValues: {
      name: '',
      apellidos: '',
      email: '',
      password: '',
      politicas: []
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Requerido'),
      email: Yup.string().email('El email es invalido').required('Requerido'),
      password: Yup.string()
       .min(16, 'El password debe de tener mínimo 16 caracteres')
        .required('Requerido'),
      politicas: Yup.array()
        .length(1)
        .required('Requerido'),
    }),
    onSubmit: async values => {
      const {
        apellidos,
        email,
        name,
        password,
        politicas
      } = values
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
    await firebase.firestore().collection("users").doc(user.uid).set({
        displayName: user.displayName || name,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        providerData: user.providerData,
        providerId: user.providerId,
        refreshToken: user.refreshToken,
        tenantId: user.tenantId,
        uid: user.uid,
        name,
        apellidos,
        politicas: politicas[0] === 'on' ? true : false
    })
      
    setUser(user)
    router.push('/admin/dashboard');
    },
  });

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-6">
                <div className="text-center mb-3">
                  <h6 className="text-slate-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <form onSubmit={formik.handleSubmit}
                >
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="name"
                    >
                      Nombre
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      id="name"
                      placeholder="Nombre"
                      type="text"
                      {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div>{formik.errors.name}</div>
                    ) : null}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="apellidos"
                    >
                      Apellidos
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      id="apellidos"
                      placeholder="Apellidos"
                      type="text"
                      {...formik.getFieldProps('apellidos')}
                    />
                    {formik.touched.apellidos && formik.errors.apellidos ? (
                      <div>{formik.errors.apellidos}</div>
                    ) : null}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      id="email"
                      placeholder="Email"
                      type="email"
                      {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div>{formik.errors.email}</div>
                    ) : null}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Contraseña
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      id="password"
                      placeholder="Contraseña"
                      type="password"
                      {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="politicas"
                        name="politicas"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-slate-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        onChange={formik.handleChange}
                      />
                      <span className="ml-2 text-sm font-semibold text-slate-600">
                        Estoy de acuerdo con las{" "}
                        <a
                          href="#pablo"
                          className="text-sky-500"
                        >
                          Politicas de Privacidad
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Crear cuenta
                      </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  )
}

export default Register
