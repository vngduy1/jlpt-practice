import { Volume2 } from "lucide-react";

interface ListeningInstructionAudioProps {
  audioUrl: string;
}

export function ListeningInstructionAudio({
  audioUrl,
}: ListeningInstructionAudioProps) {
  return (
    <section className="mb-5 rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <Volume2 className="size-5 text-primary" aria-hidden="true" />

        <p className="font-semibold">問題の説明</p>
      </div>

      {/* oxlint-disable-next-line jsx-a11y/media-has-caption -- JLPT listening audio has no caption track during the exam. */}
      <audio controls preload="metadata" src={audioUrl} className="w-full">
        お使いのブラウザは音声再生に対応していません。
      </audio>
    </section>
  );
}
