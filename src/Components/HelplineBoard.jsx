import { motion } from 'framer-motion';
import { Phone, Shield, Ambulance, AlertCircle, UserCheck, MapPin, Clock } from 'lucide-react';

const HELPLINES = [
  {
    category: 'Police & General Emergency',
    icon: Shield,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20',
    items: [
      { name: 'Police Emergency', number: '100', description: 'All emergencies' },
      { name: 'Kolkata Police Control Room', number: '033-2214-5000', description: '24/7 control room' },
      { name: 'Traffic Police', number: '033-2214-3444', description: 'Traffic emergencies' },
      { name: 'Cyber Crime', number: '1930', description: 'Online fraud & cyber crime' },
    ]
  },
  {
    category: 'Women Safety (Durga Squad)',
    icon: UserCheck,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10 border-pink-500/20',
    items: [
      { name: 'Women Helpline (Durga Squad)', number: '1091', description: '24/7 women safety' },
      { name: 'Kolkata Police Women Helpline', number: '033-2214-3166', description: 'Dedicated women cell' },
      { name: 'National Women Helpline', number: '181', description: 'Pan-India women support' },
      { name: 'Domestic Violence', number: '181 / 1091', description: 'Immediate assistance' },
    ]
  },
  {
    category: 'Medical & Ambulance',
    icon: Ambulance,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/20',
    items: [
      { name: 'Ambulance (National)', number: '102', description: 'Free ambulance service' },
      { name: 'Emergency Medical (108)', number: '108', description: 'Emergency response' },
      { name: 'Kolkata Medical College', number: '033-2241-2100', description: 'Emergency ward' },
      { name: 'SSKM Hospital', number: '033-2223-6100', description: 'Trauma & emergency' },
      { name: 'Blood Bank (Kolkata)', number: '033-2241-2100', description: 'Blood emergency' },
    ]
  },
  {
    category: 'Other Essential Services',
    icon: AlertCircle,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10 border-amber-500/20',
    items: [
      { name: 'Fire Brigade', number: '101', description: 'Fire emergencies' },
      { name: 'Disaster Management', number: '1077', description: 'Natural disasters' },
      { name: 'Child Helpline', number: '1098', description: 'Child protection' },
      { name: 'Senior Citizen Helpline', number: '14567', description: 'Elder support' },
      { name: 'Railway Helpline', number: '139', description: 'Train emergencies' },
    ]
  },
];

export default function HelplineBoard() {
  return (
    <section className="px-6 pb-12 sm:px-10 lg:px-16" aria-label="Emergency Helpline Numbers">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-terracotta/10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-terracotta font-medium mb-4">
            <AlertCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
            Emergency Helplines — Kolkata & West Bengal
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
            Important Numbers for Pandal Hopping Safety
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Save these numbers. Share with friends. Stay safe during Durga Pujo.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-terracotta/30 hover:scrollbar-thumb-terracotta/50 pr-1">
            <div className="p-4 space-y-6">
              {HELPLINES.map((category, catIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: catIndex * 0.08, ease: 'easeOut' }}
                  className={`border-l-4 ${category.color}`}
                >
                  <div className="flex items-center gap-3 mb-4 pl-4">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${category.color}`}>
                      <category.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-medium text-base text-foreground">{category.category}</h3>
                  </div>

                  <div className="space-y-2 pl-4">
                    {category.items.map((item, itemIndex) => (
                      <a
                        key={item.number}
                        href={`tel:${item.number.replace(/\s|-/g, '')}`}
                        className="group flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                        aria-label={`Call ${item.name} at ${item.number}`}
                      >
                        <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded bg-white/10">
                          <Phone className="h-4 w-4 text-muted-foreground/60 group-hover:text-terracotta transition-colors" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-lg font-mono font-semibold text-terracotta">{item.number}</span>
                            <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60">{item.description}</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50">
                          Tap to call
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 rounded-xl border border-terracotta/20 bg-terracotta/5 p-5"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-terracotta/20">
              <MapPin className="h-5 w-5 text-terracotta" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-medium text-sm text-foreground">Quick Tip</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Long-press any number to copy. Add frequently used numbers to your contacts before heading out.
                Keep your phone charged and share your live location with trusted contacts.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}