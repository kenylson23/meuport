interface LiveProjectButtonProps {
  href?: string;
  label?: string;
}

const LiveProjectButton = ({ href, label = "Ver Projeto" }: LiveProjectButtonProps) => {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border-2 border-[#D7E2EA] px-4 py-2 sm:px-8 sm:py-3 md:px-10 md:py-3.5 text-[10px] sm:text-sm md:text-base font-medium uppercase tracking-wider sm:tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 inline-block whitespace-nowrap"
      >
        {label}
      </a>
    );
  }

  return (
    <button className="rounded-full border-2 border-[#D7E2EA] px-4 py-2 sm:px-8 sm:py-3 md:px-10 md:py-3.5 text-[10px] sm:text-sm md:text-base font-medium uppercase tracking-wider sm:tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 whitespace-nowrap">
      {label}
    </button>
  );
};

export default LiveProjectButton;
