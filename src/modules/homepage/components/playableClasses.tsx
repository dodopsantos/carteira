import React, { useState } from 'react';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PlayableClasses({ callback }: any) {
  const [active, setActive] = useState(0);

  const classes = [
    {
      title: 'Shinigami',
      color: '#FF5E00',
      icon: '/shinigami.png',
      description:
        'Cada Shinigami empunha uma Zanpakutō única. Com treino e evolução, novas formas espirituais como Shikai e Bankai são despertadas, concedendo poderes devastadores.'
    },
    {
      title: 'Hollow',
      color: '#A6FE31',
      icon: '/arrankar.png',
      description:
        'Hollows evoluem através de suas formas — Gillian, Adjuchas e Arrankar. Cada estágio concede novas habilidades brutais e avanços monstruosos.'
    },
    {
      title: 'Quincy',
      color: '#0090FF',
      icon: '/quincy.png',
      description:
        'Os Quincy manipulam Reishi com maestria, criando armas espirituais moldadas pela própria energia do ambiente. Precisos, rápidos e mortais à distância.'
    },
    {
      title: 'Humano',
      color: '#FFFB00',
      icon: '/ryoka.png',
      description:
        'Humanos possuem dons espirituais despertos. Com treino, podem desenvolver técnicas únicas, habilidades psíquicas e manipulação de energia.'
    }
  ];

  const selectClass = (index: number) => {
    setActive(index);
    callback(index);
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-4xl">
      {/* texto introdutório – igual estilo da seção 2 */}
      <Text size="md" asChild>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-gray-200 md:text-base">
          Cada arquétipo possui habilidades únicas, estilos de combate distintos
          e caminhos evolutivos com identidade própria dentro do universo de{' '}
          <span className="font-semibold text-teal-300">Sword of Fate</span>.
        </p>
      </Text>

      {/* seleção de classes */}
      <div className="mb-10 flex justify-center gap-8">
        {classes.map((c, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => selectClass(i)}
            whileHover={{ scale: 1.08 }}
            animate={{ scale: active === i ? 1.12 : 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            className="relative"
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all md:h-24 md:w-24"
              style={{
                borderColor:
                  active === i ? classes[i].color : 'rgba(255,255,255,0.25)',
                boxShadow:
                  active === i
                    ? `0 0 22px ${classes[i].color}`
                    : '0 0 10px rgba(255,255,255,0.15)'
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center md:h-14 md:w-14">
                <Image
                  src={c.icon}
                  alt={c.title}
                  width={56}
                  height={56}
                  className="pointer-events-none h-full w-full object-contain"
                />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Card de descrição – altura estável */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-3xl rounded-xl border bg-black/40 px-6 py-6 shadow-xl backdrop-blur-md md:px-8 md:py-7"
        style={{
          borderColor: classes[active].color,
          boxShadow: `0 0 20px ${classes[active].color}44`,
          minHeight: '200px'
        }}
      >
        <Heading
          size="md"
          className="mb-3 text-center uppercase tracking-[0.18em]"
          style={{ color: classes[active].color }}
        >
          {classes[active].title}
        </Heading>

        <Text size="lg" asChild>
          <p className="text-center text-sm leading-relaxed text-gray-200 md:text-base">
            {classes[active].description}
          </p>
        </Text>
      </motion.div>
    </div>
  );
}
