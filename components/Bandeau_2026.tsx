import Image from 'next/image';

const Bandeau = () => (
  <div className="flex w-full items-center justify-between py-4">
    <Image
      src="/static/supersprint-logo.png"
      alt="Supersprint Paris 20ième 2026"
      width={225}
      height={160}
      sizes="(max-width: 640px) 100px, (max-width: 768px) 150px, 225px"
      className="h-auto w-25 sm:w-37 md:w-56"
      loading="eager"
    />
    <div className="text-center text-white">
      <p className="text-sm">
        9<sup>e</sup> édition
      </p>
      <p className="text-2xl font-bold lg:text-4xl">Dimanche 19 avril 2026</p>
      <p className="hidden text-xl font-bold lg:block">Piscine Georges Vallerey</p>
    </div>
    <Image
      src="/static/illustration.png"
      alt="Illustration Supersprint Paris 20ième 2026"
      width={160}
      height={160}
      sizes="(max-width: 640px) 80px, (max-width: 768px) 120px, 160px"
      className="h-auto w-20 sm:w-30 md:w-40"
    />
  </div>
);

export default Bandeau;
