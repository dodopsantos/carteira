import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import React, { ReactElement, useState } from 'react';

export default function PlayableClasses({ callback }: any): ReactElement {
  const [activity, setActivity] = useState<Number>(0);

  const handleCallback = (data: Number) => {
    setActivity(data);
    callback(data);
  };

  const metadata = [
    {
      title: 'Shinigami',
      type: 'shinigami',
      description:
        'Cada Shinigami começa sua jornada empunhando uma Zanpakuto única, uma espada espiritual imbuida com habilidades especiais. Ao longo da progressão, o jogador tem a oportunidade de desbloquear poderosas formas Shikai e, eventualmente, a lendária forma Bankai de sua Zanpakuto, expandindo seu arsenal de habilidades.'
    },
    {
      title: 'Hollow',
      type: 'hollow',
      description:
        'A principal característica dos Hollows é a capacidade de se transformarem em diferentes formas. Os jogadores começam como Hollows básicos, mas podem evoluir para formas mais poderosas à medida que progridem, como Gillians, Adjuchas e até mesmo Arrankars, ganhando habilidades especiais em cada estágio.'
    },
    {
      title: 'Quincy',
      type: 'quincy',
      description:
        'Os Quincy possuem um talento natural para a manipulação de Reishi, a energia espiritual. Isso se traduz em habilidades de combate excepcionais, como a capacidade de criar armas espirituais chamadas "Armas Quincy" a partir de Reishi, disparar flechas espirituais de alta precisão e aprimorar seus sentidos espirituais.'
    },
    {
      title: 'Humano',
      type: 'ryoka',
      description:
        'Os Humanos começam sua jornada com habilidades espirituais emergentes. Isso inclui a habilidade de detectar energias espirituais e, em alguns casos, manifestar poderes psíquicos. Cada jogador humano pode desenvolver essas habilidades ao longo do jogo, desbloqueando novas capacidades e refinando suas técnicas.'
    }
  ];

  return (
    <div>
      <Text size="lg" asChild>
        <p className="mx-auto max-w-3xl rounded bg-gray-800/95 px-6 py-2">
          Cada um dos Arquétipos oferece uma série de habilidades únicas. Se
          lançar no calor do combate, atirar em seus inimigos à distância, ou
          ser um curandeiro que também pode causar estragos usando a força dos
          elementos? Em Ravendawn, tudo isso é possível! Combine até três
          Arquétipos para personalizar verdadeiramente seu estilo de jogo.
        </p>
      </Text>
      <div className="mt-6">
        <div className="mx-auto my-0 max-w-full bg-gray-800/95 py-2 md:max-w-[60%]">
          <ul className="w-100 h-100 flex justify-around p-4">
            <li
              className={`relative h-14 w-14 origin-center rotate-45 ${
                activity === 0 &&
                'shadow-[0_0_17px_rgba(255,94,0,1)] duration-300 ease-in'
              }`}
            >
              <button
                className="pointer bg-transparent"
                onClick={() => handleCallback(0)}
              >
                <img className="-rotate-45" src="/shinigami.png" alt="" />
              </button>
            </li>
            <li
              className={`relative h-14 w-14 origin-center rotate-45 ${
                activity === 1 &&
                'shadow-[0_0_17px_rgba(166,254,49,1)] duration-300 ease-in'
              }`}
            >
              <button
                className="pointer bg-transparent"
                onClick={() => handleCallback(1)}
              >
                <img className="-rotate-45" src="/arrankar.png" alt="" />
              </button>
            </li>
            <li
              className={`relative h-14 w-14 origin-center rotate-45 ${
                activity === 2 &&
                'shadow-[0_0_17px_rgba(0,82,162,1)] duration-300 ease-in'
              }`}
            >
              <button
                className="pointer bg-transparent"
                onClick={() => handleCallback(2)}
              >
                <img className="-rotate-45" src="/quincy.png" alt="" />
              </button>
            </li>
            <li
              className={`relative h-14 w-14 origin-center rotate-45 ${
                activity === 3 &&
                'shadow-[0_0_17px_rgba(255,251,0,1)] duration-300 ease-in'
              }`}
            >
              <button
                className="pointer bg-transparent"
                onClick={() => handleCallback(3)}
              >
                <img className="-rotate-45" src="ryoka.png" alt="" />
              </button>
            </li>
          </ul>
          <div
            className={`my-4 border duration-300 ease-in ${
              activity === 0
                ? 'border-shinigami'
                : activity === 1
                ? 'border-hollow'
                : activity === 2
                ? 'border-quincy'
                : activity === 3
                ? 'border-ryoka'
                : ''
            }  `}
          ></div>
          <div className="mx-auto my-0 mt-4 max-w-[80%] py-2">
            <Heading
              size="sm"
              className={`mb-4 text-center uppercase duration-300 ease-in ${
                activity === 0
                  ? 'text-shinigami'
                  : activity === 1
                  ? 'text-hollow'
                  : activity === 2
                  ? 'text-quincy'
                  : activity === 3
                  ? 'text-ryoka'
                  : ''
              }  `}
            >
              {metadata[activity.toString()]?.title}
            </Heading>
            <Text size="lg" asChild>
              <p className="text-justify duration-300 ease-in">
                {metadata[activity.toString()]?.description}
              </p>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
