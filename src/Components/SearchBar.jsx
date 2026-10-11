import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown, MapPin, Phone, Music, Cloud, Users, Shield, AlertCircle } from 'lucide-react';
import { useSearch, getSearchSuggestions } from '@/hooks/useSearch';

const TYPE_ICONS = {
  pandal: MapPin,
  helpline: Phone,
  toilet: MapPin,
  other: (() => {
    const icons = { Music, Cloud, Users, Shield, AlertCircle };
    return icons;
  })(),
};

const TYPE_LABELS = {
  pandal: 'Pandal',
  helpline: 'Helpline',
  toilet: 'Toilet',
  other: 'Feature',
};

const ZONE_LABELS = {
  north: 'North Kolkata',
  south: 'South Kolkata',
  saltlake: 'Salt Lake',
  nearby: 'Nearby',
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const { search } = useSearch();

  const handleSearch = useCallback((value) => {
    setQuery(value);
    if (value.trim().length >= 2) {
      const searchResults = search(value);
      setResults(searchResults);
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target) &&
          resultsRef.current && !resultsRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    const maxIndex = results.length - 1;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        if (inputRef.current) inputRef.current.blur();
        break;
    }
  };

  const handleResultClick = (item) => {
    switch (item.type) {
      case 'pandal':
        window.open(`https://www.google.com/maps/search/?api=1&query=${item.original.lat},${item.original.lng}`, '_blank', 'noopener,noreferrer');
        break;
      case 'helpline':
        window.open(`tel:${item.original.number}`, '_self');
        break;
      case 'toilet':
        // Could open maps or show tooltip
        break;
      default:
        break;
    }
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    if (inputRef.current) inputRef.current.blur();
  };

  const renderResultItem = (item, index) => {
    const isSelected = index === selectedIndex;
    const Icon = item.type === 'other' 
      ? (item.category === 'Entertainment' ? Music : item.category === 'Weather' ? Cloud : item.category === 'Navigation' ? MapPin : Shield)
      : TYPE_ICONS[item.type];

    return (
      <motion.button
        key={item.id}
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.03 }}
        className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center gap-3 ${
          isSelected ? 'bg-terracotta/15' : 'hover:bg-white/5'
        }`}
        onClick={() => handleResultClick(item)}
        onMouseEnter={() => setSelectedIndex(index)}
      >
        <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg ${
          item.type === 'pandal' ? 'bg-terracotta/10 text-terracotta' :
          item.type === 'helpline' ? 'bg-red-500/10 text-red-400' :
          item.type === 'toilet' ? 'bg-blue-500/10 text-blue-400' :
          'bg-emerald-500/10 text-emerald-400'
        }`}>
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground truncate">{item.title}</span>
            <span className="text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground">
              {TYPE_LABELS[item.type]}
            </span>
          </div>
          {item.subtitle && (
            <p className="text-xs text-muted-foreground/70 truncate mt-0.5">{item.subtitle}</p>
          )}
          {item.type === 'pandal' && item.zone && (
            <p className="text-[9px] text-terracotta/80 mt-0.5">{ZONE_LABELS[item.zone] || item.zone}</p>
          )}
          {item.category && item.type !== 'pandal' && (
            <p className="text-[9px] text-muted-foreground/60 mt-0.5">{item.category}</p>
          )}
        </div>
        {item.type === 'helpline' && (
          <span className="text-xs font-mono tabular-nums text-terracotta">{item.subtitle}</span>
        )}
      </motion.button>
    );
  };

  const suggestions = getSearchSuggestions(query);

  return (
    <div className="relative" ref={inputRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" strokeWidth={1.5} />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim().length >= 2) setIsOpen(true);
            else if (suggestions.length > 0) setIsOpen(true);
          }}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search pandals, helplines, toilets…"
          className="w-full sm:w-72 lg:w-96 pl-10 pr-10 py-2 rounded-full bg-background/60 border border-white/10 text-foreground placeholder:text-muted-foreground/40 text-sm backdrop-blur focus:outline-none focus:border-terracotta/50 focus:ring-1 focus:ring-terracotta/30 transition-all"
          autoComplete="off"
          aria-label="Search pandals, helplines, toilets, and features"
          aria-expanded={isOpen}
          aria-controls="search-results"
          aria-activedescendant={selectedIndex >= 0 ? results[selectedIndex]?.id : undefined}
        />
        {query && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => { setQuery(''); handleSearch(''); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 text-muted-foreground/50 hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (query.trim().length >= 2 || suggestions.length > 0) && (
          <motion.div
            ref={resultsRef}
            id="search-results"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl bg-background/95 backdrop-blur border border-white/10 shadow-2xl overflow-hidden"
            role="listbox"
          >
            {query.trim().length >= 2 ? (
              <>
                {results.length > 0 ? (
                  <div className="max-h-[60vh] overflow-y-auto" role="listbox">
                    {results.slice(0, 15).map(renderResultItem)}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-muted-foreground/50">
                    <Search className="h-6 w-6 mx-auto mb-2 text-muted-foreground/30" strokeWidth={1.5} />
                    <p className="text-sm">No results for "{query}"</p>
                    <p className="text-xs mt-1">Try a different pandal name, helpline, or feature</p>
                  </div>
                )}
                <div className="border-t border-white/5 px-3 py-2 text-[10px] text-muted-foreground/50 flex items-center justify-between">
                  <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground/70 font-mono text-[9px]">↑ ↓</kbd> navigate • <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground/70 font-mono text-[9px]">Enter</kbd> select
                </div>
              </>
            ) : (
              <div className="px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/50 mb-2 px-2">Suggestions</p>
                <div className="max-h-[40vh] overflow-y-auto">
                  {suggestions.map((s, i) => (
                    <motion.button
                      key={s}
                      layout
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-foreground"
                      onClick={() => {
                        handleSearch(s);
                        setQuery(s);
                      }}
                    >
                      <Search className="inline-block h-4 w-4 mr-2 text-muted-foreground/40" strokeWidth={1.5} />
                      {s}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}