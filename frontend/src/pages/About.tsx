import Logo from "@/components/Logo";

const About = () => {
  return (
    <div className="mx-auto max-w-3xl animate-fade-in-up px-6 py-16">
      <Logo className="h-14" />
      <h1 className="mt-6 font-display text-2xl font-semibold text-text">About Om Satyam</h1>
      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        Om Satyam is a dental and surgical supply store based in Bharatpur, Nepal, serving
        clinics and practitioners with genuine instruments, consumables, and equipment sourced
        from certified brands. We're committed to reliability, fair pricing, and making it easy
        for practitioners across Nepal to get the supplies they need — whether through our
        online catalog or directly over WhatsApp.
      </p>
    </div>
  );
};

export default About;