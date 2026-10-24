import React from 'react';
import { CATEGORIES } from '../../data/catalogue';
import { ArrowUpRight } from 'lucide-react';

interface CategoryGridProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-20 bg-[#F5F2EB] border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[#2E5B38] text-xs font-bold uppercase tracking-widest block mb-2">
              OUR PRODUCT RANGE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3A25]">
              Shop By Traditional Category
            </h2>
          </div>
          <p className="text-xs text-[#736A57] max-w-md mt-2 md:mt-0">
            From German cold-pressed oils to A2 bilona ghee and homemade Avakaya pickles — pure nutrition for every Indian meal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group bg-[#FAF9F6] rounded-2xl p-5 border border-[#E8E4DA] hover:border-[#2E5B38] transition cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/10 rounded-xl overflow-hidden mb-4 relative bg-[#E8E4DA]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-[#1E3A25]/90 text-[#D4AF37] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                    {cat.itemCount} Variants
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#1E3A25] group-hover:text-[#2E5B38] transition flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                <p className="text-xs text-[#736A57] mt-2 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8E4DA] flex items-center justify-between text-xs font-semibold text-[#2E5B38]">
                <span>Explore Category</span>
                <span className="text-[#D4AF37]">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
