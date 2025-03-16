'use client';

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import FormattedPrice from '@/app/components/formatted-price';

const calculateMonthlyInstallment = (price, downPayment, interest, term) => {
    const loanAmount = price - downPayment;
    const monthlyInterestRate = interest / 12 / 100;
    const numberOfMonthlyPayments = term * 12;

    return (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonthlyPayments));
};

export default function MortgageCalculator({startingPrice}) {
    const [price, setPrice] = useState(startingPrice);
    const [downPayment, setDownPayment] = useState(startingPrice * 0.2);
    const [term, setTerm] = useState(15);
    const [interest, setInterest] = useState(6);
    const [installment, setInstallment] = useState<number>(0);
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        setInstallment(calculateMonthlyInstallment(price, downPayment, interest, term));
        setShowResult(true);
    };

    return (
        <div className="space-y-6 mb-8 lg:mb-20 lg:flex lg:flex-col lg:gap-6">
            <div className="block lg:flex lg:gap-6 w-full">
                {/* Property Price */}
                <div data-aos="fade-up" data-aos-duration="800" className="space-y-2 lg:flex-[0.4]">
                    <Label htmlFor="property-price" className="text-[10px] font-semibold text-gray-900">
                        PROPERTY PRICE
                    </Label>
                    <Input
                        id="property-price"
                        placeholder="Property price"
                        value={price}
                        onChange={e => setPrice(parseInt(e.target.value))}
                        style={{
                            backgroundColor: 'white',
                            borderColor: '#E1E1E1',
                            borderRadius: '0px',
                            fontSize: '12px',
                            paddingTop: '23px',
                            paddingBottom: '23px',
                        }}
                        className=" text-gray-900"
                    />
                </div>

                {/* Down Payment */}
                <div data-aos="fade-up" data-aos-duration="1000" className="space-y-2 lg:flex-[0.6]">
                    <Label htmlFor="down-payment" className="text-[10px] font-semibold text-gray-900">
                        DOWN PAYMENT
                    </Label>
                    <Input
                        id="down-payment"
                        placeholder="Enter down payment amount"
                        value={downPayment}
                        onChange={e => setDownPayment(parseInt(e.target.value))}
                        style={{
                            backgroundColor: 'white',
                            borderColor: '#E1E1E1',
                            borderRadius: '0px',
                            fontSize: '12px',
                            paddingTop: '23px',
                            paddingBottom: '23px',
                        }}
                        className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                    />
                </div>
            </div>

            <div className="block lg:flex lg:gap-6 items-end !mt-0">
                {/* Loan Term */}
                <div data-aos="fade-up" data-aos-duration="1100" className="space-y-2 lg:flex-[0.43]">
                    <Label htmlFor="loan-term" className="text-[10px] font-semibold text-gray-900">
                        LOAN TERM
                    </Label>
                    <div className="relative">
                        <Input
                            id="loan-term"
                            placeholder="Enter loan term"
                            value={term}
                            onChange={e => setTerm(parseInt(e.target.value))}
                            style={{
                                backgroundColor: 'white',
                                borderColor: '#E1E1E1',
                                borderRadius: '0px',
                                fontSize: '12px',
                                paddingRight: '48px',
                                paddingTop: '23px',
                                paddingBottom: '23px',
                            }}
                            className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                        />
                        <span
                            className="absolute hidden lg:flex inset-y-0 right-3  items-center text-black text-[12px] pointer-events-none">
                    Years
                  </span>
                    </div>
                </div>

                {/* Interest Rate */}
                <div data-aos="fade-up" data-aos-duration="1200" className="space-y-2 lg:flex-[0.43]">
                    <Label htmlFor="interest-rate" className="text-[10px] font-semibold text-gray-900">
                        INTEREST RATE
                    </Label>
                    <div className="relative">
                        <Input
                            id="interest-rate"
                            placeholder="Enter interest rate"
                            value={interest}
                            onChange={e => setInterest(parseInt(e.target.value))}
                            style={{
                                backgroundColor: 'white',
                                borderColor: '#E1E1E1',
                                borderRadius: '0px',
                                paddingRight: '48px',
                                paddingTop: '23px',
                                paddingBottom: '23px',
                            }}
                            className=" text-gray-900 border border-gray-300 focus:ring-2 focus:ring-gray-400"
                        />
                        <span
                            className="absolute hidden lg:flex inset-y-0 right-3  items-center text-black text-[12px] pointer-events-none">
                    %
                  </span>
                    </div>
                </div>
                <Button
                    data-aos="fade-up"
                    data-aos-duration="1400"
                    variant="filled"
                    onClick={handleCalculate}
                    className="w-full rounded-none text-xs py-[24px] hidden lg:flex-[0.14] lg:flex">
                    CALCULATE
                </Button>
            </div>
            {
                showResult ?
                    <div className="text-3xl">
                        Your monthly payment: Rp<FormattedPrice value={installment}/>
                    </div>
                    :
                    ''
            }
        </div>
    );
}
