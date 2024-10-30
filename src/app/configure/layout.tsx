import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/components/Steps";

export const metadata = {
  title: 'Personnalisez Votre Coque | Moh Shop',
  description: 'Outil de personnalisation en ligne pour créer votre coque de téléphone. Upload de photo, ajustement et prévisualisation en temps réel.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>
      <MaxWidthWrapper className="flex-1 flex flex-col">
        <Steps />
        {children}
      </MaxWidthWrapper>
    </>;
}