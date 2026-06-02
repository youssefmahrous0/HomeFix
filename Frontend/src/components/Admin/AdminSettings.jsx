import { useEffect, useState } from "react";
import axios from "axios";

import {
  Bell,
  Globe,
  Shield,
  DollarSign,
  Mail,
  Wrench,
  Save,
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";

export default function SettingsDashboard() {

  const [settings, setSettings] = useState({

    general: {
      app_name: "",
      app_description: "",
      support_email: "",
      support_phone: "",
    },

    notifications: {
      email_notifications: true,
      sms_notifications: false,
      push_notifications: true,
    },

    security: {
      session_timeout: 30,
      password_length: 8,
      two_factor: false,
      activity_logs: true,
    },

    finance: {
      commission_rate: 15,
      minimum_order: 50,
      payment_methods: "جميع الطرق",
      tax_rate: 14,
    },

    contact: {
      phone: "",
      email: "",
      facebook: "",
      twitter: "",
      instagram: "",
      whatsapp: "",
      address: "",
    },

    maintenance: {
      enabled: false,
      message: "",
    },

  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {

    try {

      const res = await axios.get(
        "http://https://homefix-production-0bc9.up.railway.app/admin/settings"
      );

      if (res.data.settings) {
        setSettings(res.data.settings);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const saveSettings = async () => {

    try {

      setLoading(true);

      await axios.put(
        "http://https://homefix-production-0bc9.up.railway.app/admin/settings",
        settings
      );

      alert("تم حفظ الإعدادات بنجاح");

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  const updateField = (section, field, value) => {

    setSettings({
      ...settings,

      [section]: {
        ...settings[section],
        [field]: value,
      },
    });

  };

  const today = new Date().toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (

    <div className="min-h-screen bg-[#f5f5f5] flex">

      <AdminSidebar />

      <div className="flex-1">

        {/* Top Date */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">

          <p className="text-right text-gray-500 font-medium">
            {today}
          </p>

        </div>

        <div className="p-8">

          {/* Header */}
          <div className="mb-10 text-right">

            <h1 className="text-5xl font-black text-gray-900 mb-2">
              الإعدادات
            </h1>

            <p className="text-gray-500 text-lg">
              إدارة إعدادات وتكوينات التطبيق
            </p>

          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* GENERAL */}
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">

              <div className="flex items-center gap-3 mb-6">

  <Globe className="text-green-600" />

  <h2 className="text-2xl font-black">
    الإعدادات العامة
  </h2>

</div>
              <div className="space-y-4">

                <div>

                  <label className="block text-right mb-2 font-bold">
                    اسم التطبيق
                  </label>

                  <input
                    value={settings.general.app_name}
                    onChange={(e) =>
                      updateField(
                        "general",
                        "app_name",
                        e.target.value
                      )
                    }
                    className="w-full h-[52px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
                  />

                </div>

                <div>

                  <label className="block text-right mb-2 font-bold">
                    وصف التطبيق
                  </label>

                  <textarea
                    value={settings.general.app_description}
                    onChange={(e) =>
                      updateField(
                        "general",
                        "app_description",
                        e.target.value
                      )
                    }
                    className="w-full h-[110px] bg-[#f5f5f5] rounded-xl p-4 outline-none resize-none"
                  />

                </div>

                <div>

                  <label className="block text-right mb-2 font-bold">
                    البريد الإلكتروني للدعم
                  </label>

                  <input
                    value={settings.general.support_email}
                    onChange={(e) =>
                      updateField(
                        "general",
                        "support_email",
                        e.target.value
                      )
                    }
                    className="w-full h-[52px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
                  />

                </div>

                <div>

                  <label className="block text-right mb-2 font-bold">
                    رقم الهاتف للدعم
                  </label>

                  <input
                    value={settings.general.support_phone}
                    onChange={(e) =>
                      updateField(
                        "general",
                        "support_phone",
                        e.target.value
                      )
                    }
                    className="w-full h-[52px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
                  />

                </div>

              </div>
              <button
  onClick={saveSettings}
  disabled={loading}
  className="
    w-full
    h-[52px]
    bg-green-600
    hover:bg-green-700
    transition
    rounded-2xl
    text-white
    font-bold
    flex
    items-center
    justify-center
    gap-2
    mt-6
    shadow-sm
  "
>
  <Save size={18} />

  {loading ? "جارٍ الحفظ..." : "حفظ التغييرات"}
</button>

            </div>

            {/* NOTIFICATIONS */}
<div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">

  {/* HEADER */}
  <div className="flex items-center gap-2 mb-8">

    <Bell size={20} className="text-green-600" />

    <h2 className="text-[22px] font-black text-gray-900">
      إعدادات الإشعارات
    </h2>

  </div>

  {/* ITEMS */}
  <div className="space-y-5">

    {[
      {
        key: "email_notifications",
        title: "إشعارات البريد الإلكتروني",
        desc: "إرسال إشعارات عبر البريد الإلكتروني",
      },

      {
        key: "sms_notifications",
        title: "إشعارات الرسائل النصية",
        desc: "إرسال إشعارات عبر SMS",
      },

      {
        key: "push_notifications",
        title: "الإشعارات الفورية",
        desc: "إرسال إشعارات Push",
      },

    ].map((item, index) => (

      <div key={item.key}>

        <div className="flex items-center justify-between">

             {/* TEXT */}
          <div className="text-right">

            <h4 className="font-bold text-gray-900 text-[15px]">
              {item.title}
            </h4>

            <p className="text-sm text-gray-400 mt-1">
              {item.desc}
            </p>

          </div>


          {/* SWITCH */}
          <label className="relative inline-flex cursor-pointer">

            <input
              type="checkbox"
              checked={
                settings.notifications[item.key]
              }
              onChange={(e) =>
                updateField(
                  "notifications",
                  item.key,
                  e.target.checked
                )
              }
              className="sr-only peer"
            />

            <div
              className="
                w-12
                h-6
                bg-[#0B0B2B]
                rounded-full
                transition
                relative

                peer-checked:bg-green-600

                after:content-['']
                after:absolute
                after:top-[2px]
                after:left-[2px]
                after:bg-white
                after:w-5
                after:h-5
                after:rounded-full
                after:transition-all

                peer-checked:after:translate-x-6
              "
            ></div>

          </label>

         
        </div>

        {/* BORDER */}
        {index !== 2 && (
          <div className="border-b border-gray-200 mt-5"></div>
        )}

      </div>

    ))}

  </div>

  {/* BUTTON */}
  <button
    onClick={saveSettings}
    disabled={loading}
    className="
      w-full
      h-[50px]
      bg-green-600
      hover:bg-green-700
      transition
      rounded-xl
      text-white
      font-bold
      flex
      items-center
      justify-center
      gap-2
      mt-7
      shadow-sm
    "
  >

    <Save size={17} />

    {loading
      ? "جارٍ الحفظ..."
      : "حفظ الإعدادات"}

  </button>

</div>

            {/* FINANCE */}
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">

              <div className="flex items-center justify-start gap-3 mb-6">

  <DollarSign className="text-green-600" />

  <h2 className="text-2xl font-black">
    الإعدادات المالية
  </h2>

</div>

              <div className="space-y-4">

                <div>

                  <label className="block text-right mb-2 font-bold">
                    نسبة العمولة (%)
                  </label>

                  <input
                    type="number"
                    value={settings.finance.commission_rate}
                    onChange={(e) =>
                      updateField(
                        "finance",
                        "commission_rate",
                        e.target.value
                      )
                    }
                    className="w-full h-[52px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
                  />

                </div>

                <div>

                  <label className="block text-right mb-2 font-bold">
                    الحد الأدنى للطلب(ج.م)
                  </label>

                  <input
                    type="number"
                    value={settings.finance.minimum_order}
                    onChange={(e) =>
                      updateField(
                        "finance",
                        "minimum_order",
                        e.target.value
                      )
                    }
                    className="w-full h-[52px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
                  />

                </div>

                <div>

                  <label className="block text-right mb-2 font-bold">
                    طرق الدفع المتاحة
                  </label>

                  <select
                    value={settings.finance.payment_methods}
                    onChange={(e) =>
                      updateField(
                        "finance",
                        "payment_methods",
                        e.target.value
                      )
                    }
                    className="w-full h-[52px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
                  >
                    <option>جميع الطرق</option>
                    <option>كاش فقط</option>
                    <option>بطاقات فقط</option>
                  </select>

                </div>

                <div>

                  <label className="block text-right mb-2 font-bold">
                    ضريبة القيمة المضافة (%)
                  </label>

                  <input
                    type="number"
                    value={settings.finance.tax_rate}
                    onChange={(e) =>
                      updateField(
                        "finance",
                        "tax_rate",
                        e.target.value
                      )
                    }
                    className="w-full h-[52px] bg-[#f5f5f5] rounded-xl px-4 outline-none"
                  />

                </div>

              </div>
              <button
  onClick={saveSettings}
  disabled={loading}
  className="
    w-full
    h-[52px]
    bg-green-600
    hover:bg-green-700
    transition
    rounded-2xl
    text-white
    font-bold
    flex
    items-center
    justify-center
    gap-2
    mt-6
    shadow-sm
  "
>
  <Save size={18} />

  {loading ? "جارٍ الحفظ..." : "حفظ الاعدادات"}
</button>

            </div>
            {/* SECURITY */}
<div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100">

  {/* HEADER */}
<div className="flex items-center gap-3 mb-6">

  <Shield className="text-green-600" size={22} />

  <h2 className="text-2xl font-black text-gray-900">
    الأمان والخصوصية
  </h2>

</div>
  <div className="space-y-5">

    {/* SESSION */}
    <div>

      <label className="block text-right mb-2 font-bold text-gray-800">
        مهلة الجلسة (دقائق)
      </label>

      <input
        type="number"
        value={settings.security.session_timeout}
        onChange={(e) =>
          updateField(
            "security",
            "session_timeout",
            e.target.value
          )
        }
        className="
          w-full
          h-[52px]
          bg-[#f5f5f5]
          rounded-xl
          px-4
          outline-none
          text-gray-800
        "
      />

    </div>

    {/* PASSWORD */}
    <div>

      <label className="block text-right mb-2 font-bold text-gray-800">
        الحد الأدنى لطول كلمة المرور
      </label>

      <input
        type="number"
        value={settings.security.password_length}
        onChange={(e) =>
          updateField(
            "security",
            "password_length",
            e.target.value
          )
        }
        className="
          w-full
          h-[52px]
          bg-[#f5f5f5]
          rounded-xl
          px-4
          outline-none
          text-gray-800
        "
      />

    </div>

    {/* TWO FACTOR */}
    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="text-right">

        <h4 className="font-bold text-gray-900">
          المصادقة الثنائية
        </h4>

        <p className="text-sm text-gray-500">
          تفعيل المصادقة الثنائية للمسؤولين
        </p>

      </div>

      {/* SWITCH */}
      <label className="relative inline-flex items-center cursor-pointer">

        <input
          type="checkbox"
          checked={settings.security.two_factor}
          onChange={(e) =>
            updateField(
              "security",
              "two_factor",
              e.target.checked
            )
          }
          className="sr-only peer"
        />

        <div
          className="
            w-14
            h-7
            bg-[#050521]
            rounded-full
            relative
            transition-all
            after:content-['']
            after:absolute
            after:top-[2px]
            after:left-[2px]
            after:bg-white
            after:h-6
            after:w-6
            after:rounded-full
            after:transition-all
            peer-checked:bg-green-600
            peer-checked:after:translate-x-7
          "
        ></div>

      </label>
      
    </div>

    {/* ACTIVITY LOGS */}
    <div className="flex items-center justify-between border-b border-gray-200 pb-4">

         <div className="text-right">

        <h4 className="font-bold text-gray-900">
          تسجيل الأنشطة
        </h4>

        <p className="text-sm text-gray-500">
          تفعيل سجل النشاطات الإدارية
        </p>

      </div>

      {/* SWITCH */}
      <label className="relative inline-flex items-center cursor-pointer">

        <input
          type="checkbox"
          checked={settings.security.activity_logs}
          onChange={(e) =>
            updateField(
              "security",
              "activity_logs",
              e.target.checked
            )
          }
          className="sr-only peer"
        />

        <div
          className="
            w-14
            h-7
            bg-[#050521]
            rounded-full
            relative
            transition-all
            after:content-['']
            after:absolute
            after:top-[2px]
            after:left-[2px]
            after:bg-white
            after:h-6
            after:w-6
            after:rounded-full
            after:transition-all
            peer-checked:bg-green-600
            peer-checked:after:translate-x-7
          "
        ></div>

      </label>


    </div>

  </div>

  {/* SAVE BUTTON */}
  <button
    onClick={saveSettings}
    disabled={loading}
    className="
      w-full
      h-[52px]
      bg-green-600
      hover:bg-green-700
      transition-all
      rounded-2xl
      text-white
      font-bold
      flex
      items-center
      justify-center
      gap-2
      mt-6
      shadow-sm
      disabled:opacity-70
    "
  >

    <Save size={18} />

    {loading ? "جارٍ الحفظ..." : "حفظ الإعدادات"}

  </button>

</div>
          </div>

         {/* CONTACT */}
<div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100 mt-6">

  {/* HEADER */}
  <div className="flex items-center gap-3 mb-6">

    <Mail className="text-green-600" size={22} />

    <h2 className="text-2xl font-black text-gray-900">
      إعدادات البريد الإلكتروني
    </h2>

  </div>

  {/* FORM */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    {/* MAIN PHONE */}
    <div>

      <label className="block text-right mb-2 font-bold text-gray-800">
        رقم الهاتف الرئيسي
      </label>

      <input
        value={settings.contact.phone}
        onChange={(e) =>
          updateField(
            "contact",
            "phone",
            e.target.value
          )
        }
        className="
          w-full
          h-[52px]
          bg-[#f5f5f5]
          rounded-xl
          px-4
          outline-none
          text-gray-800
        "
      />

    </div>

    {/* MAIN EMAIL */}
    <div>

      <label className="block text-right mb-2 font-bold text-gray-800">
        البريد الإلكتروني الرئيسي
      </label>

      <input
        value={settings.contact.email}
        onChange={(e) =>
          updateField(
            "contact",
            "email",
            e.target.value
          )
        }
        className="
          w-full
          h-[52px]
          bg-[#f5f5f5]
          rounded-xl
          px-4
          outline-none
          text-gray-800
        "
      />

    </div>

    {/* FACEBOOK */}
    <div>

      <label className="block text-right mb-2 font-bold text-gray-800">
        صفحة الفيسبوك
      </label>

      <input
        value={settings.contact.facebook}
        onChange={(e) =>
          updateField(
            "contact",
            "facebook",
            e.target.value
          )
        }
        className="
          w-full
          h-[52px]
          bg-[#f5f5f5]
          rounded-xl
          px-4
          outline-none
          text-gray-800
        "
      />

    </div>

    {/* WHATSAPP */}
    <div>

      <label className="block text-right mb-2 font-bold text-gray-800">
        رقم الواتساب
      </label>

      <input
        value={settings.contact.whatsapp}
        onChange={(e) =>
          updateField(
            "contact",
            "whatsapp",
            e.target.value
          )
        }
        className="
          w-full
          h-[52px]
          bg-[#f5f5f5]
          rounded-xl
          px-4
          outline-none
          text-gray-800
        "
      />

    </div>

    {/* INSTAGRAM */}
    <div>

      <label className="block text-right mb-2 font-bold text-gray-800">
        حساب انستجرام
      </label>

      <input
        value={settings.contact.instagram}
        onChange={(e) =>
          updateField(
            "contact",
            "instagram",
            e.target.value
          )
        }
        className="
          w-full
          h-[52px]
          bg-[#f5f5f5]
          rounded-xl
          px-4
          outline-none
          text-gray-800
        "
      />

    </div>

    {/* TWITTER */}
    <div>

      <label className="block text-right mb-2 font-bold text-gray-800">
        حساب تويتر
      </label>

      <input
        value={settings.contact.twitter}
        onChange={(e) =>
          updateField(
            "contact",
            "twitter",
            e.target.value
          )
        }
        className="
          w-full
          h-[52px]
          bg-[#f5f5f5]
          rounded-xl
          px-4
          outline-none
          text-gray-800
        "
      />

    </div>

  </div>

  {/* ADDRESS */}
  <div className="mt-5">

    <label className="block text-right mb-2 font-bold text-gray-800">
      العنوان
    </label>

    <textarea
      value={settings.contact.address}
      onChange={(e) =>
        updateField(
          "contact",
          "address",
          e.target.value
        )
      }
      className="
        w-full
        h-[120px]
        bg-[#f5f5f5]
        rounded-2xl
        p-4
        outline-none
        resize-none
        text-gray-800
      "
    />

  </div>

  {/* SAVE BUTTON */}
  <button
    onClick={saveSettings}
    disabled={loading}
    className="
      mt-6
      px-6
      h-[48px]
      bg-green-600
      hover:bg-green-700
      transition-all
      rounded-2xl
      text-white
      font-bold
      flex
      items-center
      justify-center
      gap-2
      shadow-sm
      disabled:opacity-70
    "
  >

    <Save size={18} />

    {loading ? "جارٍ الحفظ..." : "حفظ التغييرات"}

  </button>

</div>

          {/* MAINTENANCE */}
<div className="bg-white rounded-[28px] p-6 shadow-sm border-r-4 border-yellow-400 mt-6">

  {/* HEADER */}
  <div className="flex items-center gap-3 mb-6">

    <Wrench className="text-yellow-500" size={22} />

    <h2 className="text-2xl font-black text-yellow-600">
      وضع الصيانة
    </h2>

  </div>

  {/* DESCRIPTION */}
  <p className="text-gray-500 text-right mb-6 leading-8">
    عند تفعيل وضع الصيانة، سيتم منع الوصول إلى التطبيق
    مؤقتًا وعرض رسالة صيانة للمستخدمين.
  </p>

  {/* SWITCH BOX */}
  <div className="bg-[#f8f6e8] rounded-2xl p-5 flex items-center justify-between mb-6">

    {/* TEXT */}
    <div className="text-right">

      <h4 className="font-black text-gray-900">
        تفعيل وضع الصيانة
      </h4>

      <p className="text-sm text-gray-500">
        إيقاف التطبيق مؤقتًا للصيانة
      </p>

    </div>

    {/* SWITCH */}
    <label className="relative inline-flex items-center cursor-pointer">

      <input
        type="checkbox"
        checked={settings.maintenance.enabled}
        onChange={(e) =>
          updateField(
            "maintenance",
            "enabled",
            e.target.checked
          )
        }
        className="sr-only peer"
      />

      <div
        className="
          w-14
          h-7
          bg-gray-300
          rounded-full
          relative
          transition-all
          after:content-['']
          after:absolute
          after:top-[2px]
          after:left-[2px]
          after:bg-white
          after:h-6
          after:w-6
          after:rounded-full
          after:transition-all
          peer-checked:bg-yellow-500
          peer-checked:after:translate-x-7
        "
      ></div>

    </label>

    

  </div>

  {/* MESSAGE */}
  <div>

    <label className="block text-right mb-3 font-bold text-gray-800">
      رسالة الصيانة
    </label>

    <textarea
      placeholder="اكتب رسالة الصيانة هنا..."
      value={settings.maintenance.message}
      onChange={(e) =>
        updateField(
          "maintenance",
          "message",
          e.target.value
        )
      }
      className="
        w-full
        h-[120px]
        bg-[#f5f5f5]
        rounded-2xl
        p-4
        outline-none
        resize-none
        text-gray-800
      "
    />

  </div>

</div>



        </div>

      </div>

    </div>
  );
}