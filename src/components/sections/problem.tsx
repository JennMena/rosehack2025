import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircleQuestion, MessageSquareWarning, Zap } from "lucide-react";

const problems = [
  {
    title: "Post-Pandemic Social Anxiety",
    description:
      "The COVID-19 pandemic has left many individuals struggling with social anxiety and communication challenges, as isolation and remote work have hindered social skill development.",
    icon: MessageCircleQuestion,
  },
  {
    title: "Career Barriers",
    description:
      "This increase in social anxiety manifests in professional settings, making networking, interviews, and everyday work interactions more challenging, often hindering career growth and progression.",
    icon: MessageSquareWarning,
  },
  {
    title: "Personalized AI Practice",
    description:
      "Our app offers a solution by providing personalized practice for interviews, networking, and small talk. AI-driven feedback and progress tracking help users improve their social skills and break through career barriers.",
    icon: Zap,
  },
];

export default function Component() {
  return (
    <Section
      id="motivation"
      title="Problem & Solution"
      subtitle="Conquer social anxiety and boost your career."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
