import React, { useState } from 'react';
import { RECIPES } from '../../data/catalogue';
import { BookOpen, Clock, Users, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface RecipesViewProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const RecipesView: React.FC<RecipesViewProps> = ({ onSelectCategory }) => {
  const [activeTag, setActiveTag] = useState<string>('all');

  const tags = ['all', 'Ayurveda', 'Oil Pulling', 'Pickling', 'Healthy Breakfast', 'Dessert'];

  const filtered = activeTag === 'all'
    ? RECIPES
    : RECIPES.filter((r) => r.tags.includes(activeTag));

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[#2E5B38] text-xs font-bold uppercase tracking-widest block">
            HERITAGE KITCHEN & AYURVEDIC WELLNESS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1E3A25]">
            Traditional Recipes & Healthy Living Guides
          </h1>
          <p className="text-sm text-[#5A5243] leading-relaxed">
            Discover authentic Indian cooking methods, daily oil pulling rituals, and how cold-pressed oils elevate taste and wellness.
          </p>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full" />
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase transition border ${
                activeTag === t
                  ? 'bg-[#1E3A25] text-white border-[#1E3A25]'
                  : 'bg-white text-[#5A5243] border-[#E8E4DA] hover:bg-[#F5F2EB]'
              }`}
            >
              {t === 'all' ? 'All Guides & Recipes' : t}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl border border-[#E8E4DA] overflow-hidden shadow-xs hover:shadow-lg transition duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-16/10 bg-[#F5F2EB] relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1E3A25]/90 text-[#D4AF37] text-[10px] font-bold px-3 py-1 rounded-full uppercase backdrop-blur-xs">
                    {item.prepTime}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#8C7A5B]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#2E5B38]" />
                      {item.prepTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#2E5B38]" />
                      Serves {item.servings}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1E3A25] group-hover:text-[#2E5B38] transition leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#5A5243] line-clamp-3 leading-relaxed">
                    {item.instructions}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectCategory(item.categorySlug)}
                  className="w-full bg-[#F5F2EB] text-[#1E3A25] border border-[#DCD6C8] py-2.5 rounded-xl text-xs font-semibold hover:bg-[#2E5B38] hover:text-white transition flex items-center justify-center gap-1.5"
                >
                  <span>Shop Recommended Ingredients</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
