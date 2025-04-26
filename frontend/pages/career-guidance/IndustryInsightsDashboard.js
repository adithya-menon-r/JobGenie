'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Users } from 'lucide-react';
import styles from './IndustryInsightsDashboard.module.css';

const IndustryInsightsDashboard = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('tech');
  const [selectedInsightType, setSelectedInsightType] = useState('skills');
  const [isClient, setIsClient] = useState(false);
  const [newsInsights, setNewsInsights] = useState('');
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  const fetchIndustryNews = async () => {
    setIsLoadingInsights(true);
    try {
      const response = await fetch('http://localhost:5000/api/news/industry-fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          industry: industries.find(i => i.id === selectedIndustry).name
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      setNewsInsights(data.summary);
    } catch (error) {
      console.error('Error fetching industry news:', error);
      setNewsInsights('Unable to fetch industry insights at this time.');
    } finally {
      setIsLoadingInsights(false);
    }
  };

  useEffect(() => {
    if (selectedIndustry) {
      fetchIndustryNews();
    }
  }, [selectedIndustry]);

  useEffect(() => {
    setIsClient(true);
    // Load any saved preferences from localStorage
    const savedIndustry = localStorage.getItem('selectedIndustry');
    const savedInsightType = localStorage.getItem('selectedInsightType');

    if (savedIndustry) setSelectedIndustry(savedIndustry);
    if (savedInsightType) setSelectedInsightType(savedInsightType);
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('selectedIndustry', selectedIndustry);
      localStorage.setItem('selectedInsightType', selectedInsightType);
    }
  }, [selectedIndustry, selectedInsightType, isClient]);

  // Sample data - in a real app, this would come from an API
  const industries = [
    { id: 'tech', name: 'Technology' },
    { id: 'finance', name: 'Finance & Banking' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'marketing', name: 'Marketing & Communications' },
    { id: 'ecommerce', name: 'E-commerce & Retail' }
  ];

  const insightsData = {
    tech: {
      skills: [
        { name: 'Machine Learning', value: 85, growth: '+21%' },
        { name: 'Cloud Computing', value: 78, growth: '+15%' },
        { name: 'Cybersecurity', value: 70, growth: '+18%' },
        { name: 'Data Engineering', value: 65, growth: '+19%' },
        { name: 'DevOps', value: 60, growth: '+12%' },
        { name: 'Web Development', value: 55, growth: '+8%' },
        { name: 'UI/UX Design', value: 50, growth: '+10%' }
      ],
      salaries: [
        { name: 'Data Scientist', value: 120000, growth: '+8%' },
        { name: 'Software Engineer', value: 110000, growth: '+5%' },
        { name: 'DevOps Engineer', value: 115000, growth: '+7%' },
        { name: 'Product Manager', value: 125000, growth: '+9%' },
        { name: 'UX Designer', value: 95000, growth: '+6%' }
      ],
      growth: [
        { name: 'AI Engineer', value: 24, current: 'High', future: 'Very High' },
        { name: 'Cybersecurity Analyst', value: 22, current: 'High', future: 'Very High' },
        { name: 'Data Engineer', value: 20, current: 'High', future: 'High' },
        { name: 'Cloud Architect', value: 18, current: 'High', future: 'High' },
        { name: 'Product Manager', value: 15, current: 'Medium', future: 'High' }
      ]
    },
    finance: {
      skills: [
        { name: 'Data Analysis', value: 80, growth: '+17%' },
        { name: 'Financial Modeling', value: 75, growth: '+12%' },
        { name: 'Risk Management', value: 70, growth: '+10%' },
        { name: 'Blockchain', value: 65, growth: '+22%' },
        { name: 'Compliance', value: 60, growth: '+8%' },
        { name: 'Programming', value: 55, growth: '+15%' },
        { name: 'Machine Learning', value: 50, growth: '+18%' }
      ],
      salaries: [
        { name: 'Investment Banker', value: 140000, growth: '+6%' },
        { name: 'Financial Analyst', value: 95000, growth: '+4%' },
        { name: 'Risk Manager', value: 110000, growth: '+5%' },
        { name: 'Quantitative Analyst', value: 125000, growth: '+8%' },
        { name: 'Blockchain Developer', value: 115000, growth: '+10%' }
      ],
      growth: [
        { name: 'Fintech Developer', value: 25, current: 'High', future: 'Very High' },
        { name: 'Financial Data Scientist', value: 22, current: 'High', future: 'Very High' },
        { name: 'Risk Analyst', value: 18, current: 'Medium', future: 'High' },
        { name: 'Compliance Officer', value: 15, current: 'Medium', future: 'High' },
        { name: 'Blockchain Specialist', value: 20, current: 'Medium', future: 'High' }
      ]
    },
    healthcare: {
      skills: [
        { name: 'Healthcare Informatics', value: 75, growth: '+16%' },
        { name: 'Clinical Data Analysis', value: 70, growth: '+14%' },
        { name: 'Telehealth', value: 65, growth: '+25%' },
        { name: 'Electronic Health Records', value: 60, growth: '+10%' },
        { name: 'Patient Care', value: 55, growth: '+8%' },
        { name: 'Medical Coding', value: 50, growth: '+7%' },
        { name: 'Healthcare Compliance', value: 45, growth: '+9%' }
      ],
      salaries: [
        { name: 'Healthcare Manager', value: 105000, growth: '+7%' },
        { name: 'Health Informatics', value: 95000, growth: '+8%' },
        { name: 'Nurse Practitioner', value: 110000, growth: '+6%' },
        { name: 'Telemedicine Director', value: 120000, growth: '+9%' },
        { name: 'Medical Data Analyst', value: 90000, growth: '+10%' }
      ],
      growth: [
        { name: 'Telehealth Specialist', value: 26, current: 'High', future: 'Very High' },
        { name: 'Health Informatics', value: 22, current: 'High', future: 'Very High' },
        { name: 'Remote Patient Monitoring', value: 20, current: 'Medium', future: 'High' },
        { name: 'Healthcare AI Developer', value: 18, current: 'Medium', future: 'High' },
        { name: 'Medical Data Scientist', value: 15, current: 'Medium', future: 'High' }
      ]
    },
    marketing: {
      skills: [
        { name: 'Digital Marketing', value: 80, growth: '+15%' },
        { name: 'Content Strategy', value: 75, growth: '+12%' },
        { name: 'SEO/SEM', value: 70, growth: '+10%' },
        { name: 'Data Analytics', value: 65, growth: '+18%' },
        { name: 'Social Media', value: 60, growth: '+8%' },
        { name: 'CRM', value: 55, growth: '+7%' },
        { name: 'Marketing Automation', value: 50, growth: '+14%' }
      ],
      salaries: [
        { name: 'Marketing Director', value: 115000, growth: '+6%' },
        { name: 'Growth Marketer', value: 95000, growth: '+8%' },
        { name: 'Content Strategist', value: 85000, growth: '+7%' },
        { name: 'SEO Specialist', value: 80000, growth: '+5%' },
        { name: 'Marketing Analyst', value: 90000, growth: '+9%' }
      ],
      growth: [
        { name: 'Growth Marketing', value: 24, current: 'High', future: 'Very High' },
        { name: 'Marketing Analytics', value: 22, current: 'High', future: 'High' },
        { name: 'Content Strategy', value: 18, current: 'Medium', future: 'High' },
        { name: 'Marketing Automation', value: 16, current: 'Medium', future: 'High' },
        { name: 'Conversion Optimization', value: 15, current: 'Medium', future: 'Medium' }
      ]
    },
    ecommerce: {
      skills: [
        { name: 'Digital Marketing', value: 75, growth: '+14%' },
        { name: 'E-commerce Platforms', value: 70, growth: '+12%' },
        { name: 'Supply Chain Management', value: 65, growth: '+8%' },
        { name: 'Customer Experience', value: 60, growth: '+15%' },
        { name: 'Data Analysis', value: 55, growth: '+18%' },
        { name: 'UX/UI Design', value: 50, growth: '+10%' },
        { name: 'Payment Systems', value: 45, growth: '+9%' }
      ],
      salaries: [
        { name: 'E-commerce Manager', value: 105000, growth: '+8%' },
        { name: 'Digital Marketing Specialist', value: 85000, growth: '+7%' },
        { name: 'Supply Chain Analyst', value: 80000, growth: '+5%' },
        { name: 'UX Designer', value: 90000, growth: '+9%' },
        { name: 'E-commerce Analyst', value: 75000, growth: '+6%' }
      ],
      growth: [
        { name: 'E-commerce Strategist', value: 23, current: 'High', future: 'Very High' },
        { name: 'Customer Experience', value: 21, current: 'High', future: 'High' },
        { name: 'Supply Chain Tech', value: 19, current: 'Medium', future: 'High' },
        { name: 'Marketplace Manager', value: 17, current: 'Medium', future: 'High' },
        { name: 'E-commerce Analytics', value: 15, current: 'Medium', future: 'High' }
      ]
    }
  };

  const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p className={styles.tooltipLabel}>{`${label}`}</p>
          {selectedInsightType === 'skills' && (
            <>
              <p className={styles.tooltipValue}>{`Demand: ${payload[0].value}`}</p>
              <p className={styles.tooltipGrowth}>{`Growth: ${insightsData[selectedIndustry].skills.find(item => item.name === label).growth}`}</p>
            </>
          )}
          {selectedInsightType === 'salaries' && (
            <>
              <p className={styles.tooltipValue}>{`Salary: ${formatCurrency(payload[0].value)}`}</p>
              <p className={styles.tooltipGrowth}>{`Growth: ${insightsData[selectedIndustry].salaries.find(item => item.name === label).growth}`}</p>
            </>
          )}
          {selectedInsightType === 'growth' && (
            <>
              <p className={styles.tooltipValue}>{`Growth Rate: ${payload[0].value}%`}</p>
              <p className={styles.tooltipCurrent}>{`Current Demand: ${insightsData[selectedIndustry].growth.find(item => item.name === label).current}`}</p>
              <p className={styles.tooltipFuture}>{`Future Projection: ${insightsData[selectedIndustry].growth.find(item => item.name === label).future}`}</p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.industryInsightsDashboard}>
      <div className={styles.insightsHeader}>
        <h2 style={{fontWeight: "bold"}}>Industry Insights Dashboard</h2>
        <p>Explore trending skills, salaries, and growth projections across industries</p>
      </div>

      <div className={styles.insightsControls}>
        <div className={styles.industrySelector}>
          <label>Select Industry:</label>
          <div className={styles.industryButtons}>
            {industries.map((industry) => (
              <button
                key={industry.id}
                className={`${styles.industryButton} ${selectedIndustry === industry.id ? styles.selected : ''}`}
                onClick={() => setSelectedIndustry(industry.id)}
              >
                {industry.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.insightTypeSelector}>
          <label>View Insights By:</label>
          <div className={styles.insightTypeButtons}>
            <button
              className={`${styles.insightTypeButton} ${selectedInsightType === 'skills' ? styles.selected : ''}`}
              onClick={() => setSelectedInsightType('skills')}
            >
              <TrendingUp size={16} />
              In-Demand Skills
            </button>
            <button
              className={`${styles.insightTypeButton} ${selectedInsightType === 'salaries' ? styles.selected : ''}`}
              onClick={() => setSelectedInsightType('salaries')}
            >
              <DollarSign size={16} />
              Salary Data
            </button>
            <button
              className={`${styles.insightTypeButton} ${selectedInsightType === 'growth' ? styles.selected : ''}`}
              onClick={() => setSelectedInsightType('growth')}
            >
              <Users size={16} />
              Job Growth
            </button>
          </div>
        </div>
      </div>


      <div className={styles.realTimeInsights}>
        <h3>Real-Time Industry Insights</h3>
        <div className={styles.insightsBox}>
          {isLoadingInsights ? (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>Analyzing latest industry news...</p>
            </div>
          ) : (
            <p>{newsInsights}</p>
          )}
        </div>
      </div>

      <div className={styles.insightsVisualization}>
        <h3>
          {selectedInsightType === 'skills' && 'Top In-Demand Skills'}
          {selectedInsightType === 'salaries' && 'Average Salaries by Role'}
          {selectedInsightType === 'growth' && 'Projected Job Growth (%)'}
          {` in ${industries.find(i => i.id === selectedIndustry).name}`}
        </h3>

        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={insightsData[selectedIndustry][selectedInsightType]}
              margin={{ top: 20, right: 30, left: 30, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                domain={selectedInsightType === 'salaries' ? [0, 'dataMax + 20000'] : [0, 'dataMax + 10']}
                tickFormatter={selectedInsightType === 'salaries' ? (value) => `$${value / 1000}k` : undefined}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill={
                  selectedInsightType === 'skills' ? "#4f46e5" :
                    selectedInsightType === 'salaries' ? "#10b981" :
                      "#f59e0b"
                }
                barSize={40}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IndustryInsightsDashboard;