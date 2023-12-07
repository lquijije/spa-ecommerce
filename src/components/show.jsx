import Link from "next/link";
import Image from 'next/image'

const getData = async () => {
  try {
    const response = await fetch(`http://localhost:5199/Product`, { headers: {
        "Content-Type": "application/json",
      }, method: "GET", cache: "no-store" });
      let data = await response.json()
      return data
    //return response.json();
  } catch (error) {
    console.log("Error : ", error);
  }
};

//Para ver todos los documentos que estan en ATLAS en la consola de VSC
//const {data} = await getData()
//console.log(data);

const Show = async () => {
  const  data  = await getData();
  console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((element) => (
        <div className="p-5 shadow-lg shadow-indigo-500/50 my-4 flex justify-between gap-4 items-start">
            <div>
            <Image
              src={`/${element.it_imagen}`}
              alt=""
              className="rounded"
              width={100}
              height={24}
              priority
            />
            </div>
          <div>
            <h2 className="font-bold text-2xl text-slate-700">
              {`${element.it_descripcion}`}
            </h2>
            <p>{`$ ${element.it_precio}`}</p>
          </div>

          {/* Botones de acciones */}
          <div className="flex mt-4 space-x-3 md:mt-6">
            <Link
              href={`/checkout/${element.it_id}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-violet-400 rounded-lg hover:bg-violet-600 focus:ring-4 focus:outline-none"
            >
              Agregar al carrito
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Show;