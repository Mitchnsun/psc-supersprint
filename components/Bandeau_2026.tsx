import Image from 'next/image';

const Bandeau = () => (
  <div className="w-full py-4 flex items-center justify-between">
    <Image
      src="/static/supersprint-logo.png"
      alt="Supersprint Paris 20ième 2026"
      width={225}
      height={160}
      sizes="(max-width: 640px) 100px, (max-width: 768px) 150px, 225px"
      className="w-25 sm:w-37 md:w-56 h-auto"
    />
    <div className="text-white text-center">
      <p className="text-sm">
        9<sup>e</sup> édition
      </p>
      <p className="font-bold text-2xl lg:text-4xl">Dimanche 19 avril 2026</p>
      <p className="font-bold hidden lg:block text-xl">Piscine Georges Vallerey</p>
    </div>
    <Image
      src="/static/illustration.png"
      alt="Illustration Supersprint Paris 20ième 2026"
      width={160}
      height={160}
      sizes="(max-width: 640px) 80px, (max-width: 768px) 120px, 160px"
      className="w-20 sm:w-30 md:w-40 h-auto"
    />
  </div>
);

export default Bandeau;
