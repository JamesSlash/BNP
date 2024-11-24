import React, { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, Check } from 'lucide-react';
import { ContactFormData } from '../types';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'email',
    acceptTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically send the data to your backend
  };

  const handleChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Contacta con un especialista
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">¡Mensaje enviado!</h3>
                <p className="text-gray-600">
                  Nos pondremos en contacto contigo lo antes posible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00915a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00915a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00915a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00915a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Método de contacto preferido
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={(e) => handleChange('preferredContact', e.target.value as 'email' | 'phone')}
                        className="mr-2"
                      />
                      Email
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={(e) => handleChange('preferredContact', e.target.value as 'email' | 'phone')}
                        className="mr-2"
                      />
                      Teléfono
                    </label>
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    checked={formData.acceptTerms}
                    onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                    className="mt-1 mr-2"
                  />
                  <label className="text-sm text-gray-600">
                    Acepto la política de privacidad y el tratamiento de mis datos personales
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#00915a] text-white py-3 rounded-lg font-semibold hover:bg-[#007a4d] transition-colors"
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Información de contacto</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-[#00915a]" />
                    <span>+34 900 123 456</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-[#00915a]" />
                    <span>contacto@bnpparibas-leasing.es</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-[#00915a]" />
                    <span>Calle Ejemplo 123, 28001 Madrid</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Horario de atención</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-[#00915a]" />
                    <div>
                      <p className="font-medium">Lunes a Viernes</p>
                      <p className="text-gray-600">9:00 - 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-[#00915a]" />
                    <div>
                      <p className="font-medium">Sábados</p>
                      <p className="text-gray-600">9:00 - 14:00</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-[#00915a]" />
                    <div>
                      <p className="font-medium">Domingos</p>
                      <p className="text-gray-600">Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  ¿Prefieres una atención inmediata? Llámanos ahora y te atenderemos al momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}