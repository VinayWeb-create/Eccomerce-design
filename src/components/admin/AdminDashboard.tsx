import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Mic,
  MessageCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Search,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  PhoneCall,
  Download,
  Filter,
  Eye,
  EyeOff,
  LogOut,
  Lock,
} from 'lucide-react';
import { PRODUCTS, COMPANY_INFO } from '../../data/catalogue';

interface AdminDashboardProps {
  onExitAdmin?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExitAdmin }) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'crm' | 'voice' | 'automations' | 'audit'
  >('overview');

  const [productsList, setProductsList] = useState(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [maskPhones, setMaskPhones] = useState(true);

  const maskPhoneNumber = (phone: string) => {
    if (!maskPhones) return phone;
    if (phone.length <= 5) return '*****';
    return phone.substring(0, 3) + '*****' + phone.substring(phone.length - 2);
  };

  // Sample CRM Leads Data
  const leads = [
    {
      id: 'L-101',
      name: 'Ramesh Reddy',
      phone: '9848012345',
      city: 'Hyderabad (Jubilee Hills)',
      requirement: 'Bulk 15 Litre Groundnut Oil tin & 2kg A2 Ghee for festive wedding catering',
      status: 'New Lead',
      createdAt: '2026-08-12 14:30',
    },
    {
      id: 'L-102',
      name: 'Suhasini Rao',
      phone: '9989054321',
      city: 'Secunderabad',
      requirement: 'Enquiring about low-salt Avakaya Pickle for senior diabetic parents',
      status: 'Contacted',
      createdAt: '2026-08-11 11:15',
    },
    {
      id: 'L-103',
      name: 'Anand Sharma',
      phone: '9701234567',
      city: 'Bangalore',
      requirement: 'Monthly subscription for Cold Pressed Sesame Oil for oil pulling',
      status: 'Closed Won',
      createdAt: '2026-08-10 09:40',
    },
  ];

  // Sample Voice Call Logs
  const voiceLogs = [
    {
      id: 'V-8801',
      customer: 'Srinivas G',
      phone: '9885011223',
      language: 'Telugu',
      query: 'Naaku 1 Litre Groundnut Oil price cheppandi',
      aiResponse: 'Groundnut Oil 1 Litre is ₹480. Added to cart.',
      toolsFired: ['get_product_price'],
      sentiment: 'POSITIVE',
      duration: '42s',
      timestamp: 'Today, 10:14 AM',
    },
    {
      id: 'V-8802',
      customer: 'Priyanka M',
      phone: '9121098765',
      language: 'English',
      query: 'What is the courier status for order DN-2026-8891?',
      aiResponse: 'Delivered via Express Courier Hyderabad.',
      toolsFired: ['get_order_status'],
      sentiment: 'NEUTRAL',
      duration: '28s',
      timestamp: 'Today, 09:30 AM',
    },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="bg-[#1E3A25] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-b-4 border-[#D4AF37]">
          <div>
            <span className="bg-[#D4AF37] text-[#1E3A25] text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider mb-2 inline-block">
              DEEPTHA ENTERPRISE CONSOLE
            </span>
            <h1 className="font-serif text-3xl font-bold">Hyderabad HQ Management Portal</h1>
            <p className="text-xs text-[#DCD6C8] mt-1">
              FSSAI Lic: {COMPANY_INFO.fssaiLic} | German Cold-Pressing Production Console
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setMaskPhones(!maskPhones)}
              className="bg-[#2E5B38] text-[#D4AF37] text-xs px-3.5 py-2 rounded-xl font-semibold hover:bg-[#D4AF37] hover:text-[#1E3A25] transition flex items-center gap-2 border border-[#D4AF37]/30"
            >
              {maskPhones ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{maskPhones ? 'Unmask CRM Data' : 'Mask CRM Data'}</span>
            </button>

            {onExitAdmin && (
              <button
                onClick={onExitAdmin}
                className="bg-red-900/40 text-red-100 text-xs px-4 py-2 rounded-xl font-semibold hover:bg-red-800 transition flex items-center gap-2 border border-red-700/50"
              >
                <LogOut className="w-4 h-4" />
                <span>Exit Admin Console</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-[#E8E4DA] gap-6 text-xs font-bold uppercase tracking-wider text-[#5A5243] no-scrollbar">
          {[
            { id: 'overview', label: 'Business KPIs', icon: LayoutDashboard },
            { id: 'products', label: 'Catalogue & Stock', icon: Package },
            { id: 'orders', label: 'Orders & Courier AWB', icon: ShoppingCart },
            { id: 'crm', label: 'Lead CRM', icon: Users },
            { id: 'voice', label: 'Voice AI Logs', icon: Mic },
            { id: 'automations', label: 'WhatsApp Campaigns', icon: MessageCircle },
            { id: 'audit', label: 'FSSAI Audit Log', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 border-b-2 flex items-center gap-2 shrink-0 transition ${
                  activeTab === tab.id
                    ? 'border-[#2E5B38] text-[#2E5B38]'
                    : 'border-transparent hover:text-[#1E3A25]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-[#E8E4DA] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#8C7A5B] font-bold uppercase">
                  <span>Gross Revenue (Aug)</span>
                  <DollarSign className="w-4 h-4 text-[#2E5B38]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#1E3A25] mt-2">
                  ₹4,82,900
                </div>
                <span className="text-[11px] text-[#2E5B38] font-bold mt-1 inline-block">
                  ↑ +24% vs July 2026
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E8E4DA] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#8C7A5B] font-bold uppercase">
                  <span>Total Orders</span>
                  <ShoppingCart className="w-4 h-4 text-[#2E5B38]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#1E3A25] mt-2">
                  1,280
                </div>
                <span className="text-[11px] text-[#2E5B38] font-bold mt-1 inline-block">
                  98.4% Delivered On-Time
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E8E4DA] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#8C7A5B] font-bold uppercase">
                  <span>Avg Order Value</span>
                  <TrendingUp className="w-4 h-4 text-[#2E5B38]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#1E3A25] mt-2">
                  ₹1,120
                </div>
                <span className="text-[11px] text-[#8C7A5B] mt-1 inline-block">
                  Top Seller: Groundnut 1L
                </span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E8E4DA] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#8C7A5B] font-bold uppercase">
                  <span>Voice AI Interceptions</span>
                  <Mic className="w-4 h-4 text-[#2E5B38]" />
                </div>
                <div className="font-serif text-3xl font-bold text-[#1E3A25] mt-2">
                  482
                </div>
                <span className="text-[11px] text-[#2E5B38] font-bold mt-1 inline-block">
                  Telugu & English Supported
                </span>
              </div>
            </div>

            {/* Production Batch Status */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8E4DA] space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#1E3A25] flex items-center justify-between">
                <span>German Cold-Press Mill Production Batch Status</span>
                <span className="text-xs text-[#2E5B38] font-bold">Domalguda, Hyderabad</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#E8E4DA]">
                  <span className="font-bold text-[#1E3A25] block">Batch #CP-2026-92</span>
                  <p className="text-[#8C7A5B] mt-0.5">Sesame Seed Extraction</p>
                  <div className="mt-3 flex items-center justify-between font-bold text-[#2E5B38]">
                    <span>STATUS: Active Crushing</span>
                    <span>720 Litres</span>
                  </div>
                </div>

                <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#E8E4DA]">
                  <span className="font-bold text-[#1E3A25] block">Batch #BG-2026-11</span>
                  <p className="text-[#8C7A5B] mt-0.5">A2 Cow Milk Curd Bilona Churn</p>
                  <div className="mt-3 flex items-center justify-between font-bold text-[#D4AF37]">
                    <span>STATUS: Slow Heating</span>
                    <span>140 Litres Ghee</span>
                  </div>
                </div>

                <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#E8E4DA]">
                  <span className="font-bold text-[#1E3A25] block">Batch #PK-2026-08</span>
                  <p className="text-[#8C7A5B] mt-0.5">Avakaya Curing in Sesame Oil</p>
                  <div className="mt-3 flex items-center justify-between font-bold text-[#2E5B38]">
                    <span>STATUS: Curing (Day 7/10)</span>
                    <span>450 Jars</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS & INVENTORY */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#8C7A5B]" />
                <input
                  type="text"
                  placeholder="Filter catalogue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#DCD6C8] rounded-xl py-2 pl-9 pr-3 text-xs text-[#1E3A25]"
                />
              </div>

              <button className="bg-[#2E5B38] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#1E3A25] transition flex items-center gap-1.5 shrink-0">
                <Plus className="w-4 h-4" />
                <span>Add New Catalogue Item</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-[#E8E4DA] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F2EB] text-[#1E3A25] font-serif font-bold uppercase tracking-wider border-b border-[#E8E4DA]">
                  <tr>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Default Price</th>
                    <th className="p-4">FSSAI Lic</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E4DA] text-[#5A5243]">
                  {productsList.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF9F6]">
                      <td className="p-4 font-bold text-[#1E3A25]">{p.name}</td>
                      <td className="p-4">{p.categoryName}</td>
                      <td className="p-4 font-serif font-bold text-[#1E3A25]">₹{p.defaultPrice}</td>
                      <td className="p-4 font-mono">{p.fssaiLic}</td>
                      <td className="p-4">
                        <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                          In Stock ({p.variants.reduce((a, v) => a + v.stock, 0)} units)
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-[#2E5B38] hover:text-[#1E3A25] font-semibold mr-3">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CRM LEADS */}
        {activeTab === 'crm' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#1E3A25]">
                Deeptha Sales Leads & Inquiry Board
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#8C7A5B] bg-[#F5F2EB] px-3 py-1.5 rounded-full border border-[#DCD6C8]">
                <Lock className="w-3.5 h-3.5 text-[#2E5B38]" />
                <span>Restricted Lead Access</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#E8E4DA] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F2EB] text-[#1E3A25] font-serif font-bold border-b border-[#E8E4DA]">
                  <tr>
                    <th className="p-4">Lead ID</th>
                    <th className="p-4">Name & Phone</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Requirement Details</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E4DA] text-[#5A5243]">
                  {leads.map((l) => (
                    <tr key={l.id}>
                      <td className="p-4 font-mono font-bold text-[#1E3A25]">{l.id}</td>
                      <td className="p-4">
                        <strong className="text-[#1E3A25] block">{l.name}</strong>
                        <span className="font-mono text-[11px] text-[#8C7A5B]">
                          +91 {maskPhoneNumber(l.phone)}
                        </span>
                      </td>
                      <td className="p-4">{l.city}</td>
                      <td className="p-4 max-w-xs">{l.requirement}</td>
                      <td className="p-4">
                        <span className="bg-[#D4AF37]/20 text-[#1E3A25] px-2.5 py-0.5 rounded-full font-bold">
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: VOICE AI LOGS */}
        {activeTab === 'voice' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#1E3A25]">
                Multilingual Voice Assistant Call Transcripts
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#8C7A5B] bg-[#F5F2EB] px-3 py-1.5 rounded-full border border-[#DCD6C8]">
                <Lock className="w-3.5 h-3.5 text-[#2E5B38]" />
                <span>Encrypted Audio Logs</span>
              </div>
            </div>

            <div className="space-y-4">
              {voiceLogs.map((log) => (
                <div key={log.id} className="bg-white p-6 rounded-3xl border border-[#E8E4DA] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#E8E4DA] pb-3 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-[#1E3A25]">{log.id}</span>
                      <strong className="text-[#1E3A25]">
                        {log.customer} (+91 {maskPhoneNumber(log.phone)})
                      </strong>
                      <span className="bg-[#2E5B38] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                        {log.language}
                      </span>
                    </div>
                    <span className="text-[#8C7A5B]">{log.timestamp}</span>
                  </div>

                  <div className="text-xs space-y-1">
                    <p><strong>Customer Audio Transcript:</strong> "{log.query}"</p>
                    <p className="text-[#2E5B38]"><strong>AI Synthesized Response:</strong> "{log.aiResponse}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
